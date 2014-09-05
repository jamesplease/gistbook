/* jshint -W084 */

/*
 * router
 * A heavily modified Backbone Router that's
 * substantially more powerful. It's a bit
 * of a Frankenstein right now, as it only
 * modifies the Backbone.Router. A full
 * rewrite could clean it up quite a bit.
 *
 * Also, it wasn't tested against splats
 * or optional parameters so don't use 'em!
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');
var Radio = require('radio');

var routerChannel = Radio.channel('router');

var routerOptions = ['regions', 'routes', 'processTitle', 'defaultTitle'];

// An alternate version of _.result that
// accepts arguments
function result(obj, prop) {
  if (!_.isFunction(obj[prop])) {
    return obj[prop];
  } else {
    return obj[prop].apply(obj, _.rest(arguments, 2));
  }
}

mn.Router = bb.Router.extend({
  constructor: function(options) {
    _.bindAll(this, '_registerRoute');

    _.extend(this, _.pick(options, routerOptions));

    this.routeParams = {};

    // Create our routes if it doesn't exist
    this.routes = this.routes || [];

    this.defaultTitle = this.defaultTitle || document.title;
    this._resetTitle();

    // Register our initial routes
    _.each(this.routes, function(Route, url) {
      this._registerRoute(Route, url);
    }, this);

    // Add our initial regions
    this.addRegions(this.regions);

    this.channel = routerChannel;
    this._configureEvents();

    this.initialize.apply(this, arguments);
  }
});

_.extend(mn.Router.prototype, {

  initialize: function() {},

  _configureEvents: function() {
    this.channel.comply('navigate', function(route) {
      this.navigate(route, {trigger:true});
    }, this);
  },

  // Add a single Route
  registerRoute: function(Route) {
    if (_.contains(this.routes, Route)) {
      return;
    }
    this.routes.push(Route);

    var route = new Route();

    this._routes.push(route);

    this._registerRoute(route);
  },

  processTitle: function(title) { return title; },

  // Perform the shut down methods of a Route being exited
  _exitRoute: function(route) {
    if (!route) {
      return;
    }

    route.triggerMethod('exit');
  },

  // Add many routes
  registerRoutes: function() {
    _.each(arguments, this.registerRoute);
  },

  // Get a Route by its URL
  getRoute: function(url) {
    url = url.substr(1);

    var matchedRoute;
    _.each(this._routes, function(route, routeUrl) {
      if (routeUrl === url) {
        matchedRoute = route;
      }
    });
    return matchedRoute;
  },

  _resetTitle: function() {
    if (document.title === this.defaultTitle) {
      return;
    }
    document.title = this.defaultTitle;
  },

  route: function(route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];
    var router = this;
    bb.history.route(route, function(fragment, options) {
      options = options || {};
      var req = [router._getUrlData(route, fragment)];
      if (router.execute(callback, req.concat([options]), name) !== false) {
        router.trigger.apply(router, ['route:' + name].concat(req, [options]));
        router.trigger('route', name, req);
        bb.history.trigger('route', router, name, req);
      }
    });
    return this;
  },

  execute: function(callback, args, name) {
    if (callback) {
      callback.apply(this, args);
    }
  },

  _generateTree: function(Route, url, baseUrl) {
    var tree = {};

    baseUrl = baseUrl || '';

    // Create the full URL for this Route
    var fullUrl = baseUrl + url;

    // Add the route to our internal hash
    tree[fullUrl] = new Route();

    // Lastly, register all of the route's children, too
    if (!Route.prototype.routes) { return tree; }
    _.each(Route.prototype.routes, function(childRoute, childUrl) {
      tree = _.extend(tree, this._generateTree(childRoute, childUrl, url));
    }, this);

    return tree;
  },

  // Register the route, and all of its children, with the
  // internal Backbone.Router
  _registerRoute: function(Route, url) {

    // Instantiate the Route & it's tree of children Routes, storing
    // them internally on the router.
    this._routes = this._routes || {};
    var tree = this._generateTree(Route, url);

    window.router = this;
    window.historyPls = bb.history;

    // Register the Route tree on the router
    _.each(tree, function(route, url) {
      this._routes[url] = route;
      route._router = this;
      var self = this;
      this.route(url, url, function(urlData, navigateOptions) {
        var redirect = result(route, 'redirect', urlData);

        if (_.isString(redirect)) {
          self.navigate(redirect, {trigger:true});
        }

        else {
          self._exitRoute(self.currentRoute);
          route.triggerMethod('enter', urlData);
          self.triggerMethod('before:navigate', route, urlData);
          route._callback(urlData, navigateOptions);
          self.currentRoute = route;
          self.triggerMethod('navigate', route, urlData);
        }
      });
    }, this);
  },

  _routeToRegExp: function(route) {

    // I store it up here originally, which makes it duplicate. This is the non-regex version
    // What's the use case?
    this.routeParams[route] = this.routeParams[route] || [];
    var self = this;
    var optionalParam = /\((.*?)\)/g;
    var namedParam    = /(\(\?)?:\w+/g;
    var splatParam    = /\*\w+/g;
    var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    var tmpArray = [];
    var newRoute = route.replace(escapeRegExp, '\\$&')
                 .replace(optionalParam, '(?:$1)?')
                 .replace(namedParam, function(match, optional) {
                    tmpArray.push(match.substr(1));
                    return optional ? match : '([^/?]+)';
                 })
                 .replace(splatParam, '([^?]*?)');
    var regexStr = '^' + newRoute + '(?:\\?([\\s\\S]*))?$';
    self.routeParams[regexStr] = tmpArray;
    return new RegExp(regexStr);
  },

  _getUrlData: function(route, fragment) {
    var routeParams = this._extractParameters(route, fragment);
    var queryString = routeParams.pop();
    
    return {
      query:  this._getQueryParameters(queryString),
      params: this._getNamedParams(route, routeParams)
    };
  },

  // Decodes the Url query string parameters & and returns them
  // as an object. Supports empty parameters, but not array-like
  // parameters (which aren't in the URI specification)
  _getQueryParameters: function(queryString) {
    if (!queryString) { return {}; }
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = queryString;

    urlParams = {};
    while (match = search.exec(query)) {
       urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
  },

  // Returns the named parameters of the route
  _getNamedParams: function(route, routeParams) {
    var routeString = route.toString();
    routeString = routeString.substr(1, routeString.length-2);
    var routeArr = this.routeParams[routeString];
    var paramObj = {};
    _.each(routeArr, function(arrVal, i) {
      paramObj[arrVal] = routeParams[i];
    });
    return paramObj;
  },

  triggerMethod: mn.triggerMethod
}, mn.RegionsMixin, bb.Events);

mn.Router.extend = mn.extend;
