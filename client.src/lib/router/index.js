/*
 * router
 * A custom-made router to support stateful transitions
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');
var Radio = require('radio');

var RegionsMixin = require('../regions-mixin');

var routerChannel = Radio.channel('router');

var routerOptions = ['regions', 'routes', 'processTitle', 'defaultTitle'];

var Router = function(options) {
  _.bindAll(this, '_registerRoute');

  _.extend(this, _.pick(options, routerOptions));

  // Create our routes if it doesn't exist
  this.routes = this.routes || [];

  this.defaultTitle = this.defaultTitle || document.title;
  this._resetTitle();

  // We rely on the original router internally
  this._router = new bb.Router();

  // Register our initial routes
  _.each(this.routes, function(Route, url) {
    this._registerRoute(Route, url);
  }, this);

  // Add our initial regions
  this.addRegions(this.regions);

  this.channel = routerChannel;
  this._configureEvents();

  this.initialize.apply(this, arguments);
};

_.extend(Router.prototype, {

  initialize: function() {},

  _configureEvents: function() {
    this.channel.comply('navigate', function(route) {
      this.navigate(route, {trigger:true});
    }, this);
  },

  navigate: function(url, options) {
    options = options || {};
    options.trigger = true;

    var newRoute = this.getRoute(url);

    if (!newRoute) {
      this.triggerMethod('unmatchedRoute', url);
      this._router.navigate(url);
      return;
    }

    var redirect = _.result(newRoute, 'redirect');

    // Check if we need to conditionally redirect.
    if (_.isString(redirect)) {
      this.navigate(redirect);
    }

    // If we don't, then we continue along with the routing
    else {
      this._exitRoute(this.currentRoute);

      if (newRoute) {
        newRoute.triggerMethod('enter');
      }

      this.triggerMethod('before:navigate', newRoute);
      this._router.navigate(url, {trigger:true});
      this.currentRoute = newRoute;
      this.triggerMethod('navigate', newRoute);
    }

    
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

  // Determine if the routeUrl matches the url
  _matchRoute: function(routeUrl, url) {

  },

  _resetTitle: function() {
    if (document.title === this.defaultTitle) {
      return;
    }
    document.title = this.defaultTitle;
  },

  _registerInternally: function(Route, url, baseUrl) {
    baseUrl = baseUrl || '';

    // Create the full URL for this Route
    var fullUrl = baseUrl + url;

    // Add the route to our internal hash
    this._routes[fullUrl] = new Route();

    // Lastly, register all of the route's children, too
    if (!Route.prototype.routes) { return; }
    _.each(Route.prototype.routes, function(childRoute, childUrl) {
      this._registerInternally(childRoute, childUrl, url);
    }, this);
  },

  // Register the route, and all of its children, with the
  // internal Backbone.Router
  _registerRoute: function(Route, url) {

    // Instantiate the Route & it's tree of children Routes, storing
    // them internally on the router.
    this._routes = this._routes || {};
    this._registerInternally(Route, url);

    window.router = this;
    window.historyPls = bb.history;

    // Register the Route tree on the router
    _.each(this._routes, function(route, url) {
      route._router = this;
      this._router.route(url, url, route._callback);
    }, this);
  },

  triggerMethod: mn.triggerMethod
}, RegionsMixin, bb.Events);

Router.extend = mn.extend;

module.exports = Router;
