/*
 * route
 * A Class that ties together data, a view, and a region. Goes with
 * the new Router Class. This is still a really rough draft – lots
 * of cleanup is necessary!
 *
 */

var $ = require('jquery');
var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');

var routeOptions = [
  'routes',
  'onEnter',
  'onExit',
  'redirect',
  'views',
  'title'
];

// An alternate version of _.result that
// accepts arguments
function result(obj, prop) {
  if (!_.isFunction(obj[prop])) {
    return obj[prop];
  } else {
    return obj[prop].apply(obj, _.rest(arguments, 2));
  }
}

var Route = function(options) {
  options = options || {};
  _.bindAll(this, '_callback', '_buildView');
  _.extend(this, _.pick(options, routeOptions));

  // This is our data cache
  this._data = {};
};

_.extend(Route.prototype, {

  // This is the primary callback that we register on the route change event
  // It's where all of the magic happens: data is fetched, views are rendered
  // and displayed to the user
  _callback: function(urlData, navigateOptions) {

    // Update the page title, if one was specified.
    // Otherwise, reset the title to be the default
    this.title ? this._updateTitle() : this._router._resetTitle();

    this._buildDom(urlData, navigateOptions);
  },

  // Return all of the Regions for this Route
  getRegions: function() {
    return _.flatten(_.map(this._views, function(view) {
      return view._regions;
    }));
  },

  _updateTitle: function() {
    document.title = this._router.processTitle(this.title);
  },

  _buildDom: function(urlData, navigateOptions) {
    if (!this.views) { return; }
    this._verifyConfiguration();
    _.each(this.views, _.partial(this._buildView, urlData, navigateOptions));
  },

  _buildView: function(urlData, navigateOptions, viewDefinition, viewName) {
    var region = this._getViewRegion(viewDefinition.region);
    var fetchModel = this._shouldFetch(viewDefinition.model, navigateOptions);
    var fetchCollection = this._shouldFetch(viewDefinition.collection, navigateOptions);
    // console.log('should i fetch?', fetchModel, fetchCollection);
    var model = this._getDataObj(viewDefinition.model, urlData);
    var collection = this._getDataObj(viewDefinition.collection, urlData);

    if (!fetchModel && !fetchCollection) {
      if (model || collection) {
        console.log('Not fetching; reusing');
      }
      this._displayView(region, viewDefinition.view, {
        model: model,
        collection: collection
      });
    }

    else {
      var route = this;
      console.log('Fetching');
      // This _.result calls handle the model or collection being undefined
      $.when(_.result(model, 'fetch'), _.result(collection, 'fetch'))
        .then(function() {
          console.log('Fetch success');
          route._displayView(region, viewDefinition.view, {
            model: model,
            collection: collection
          });
        })
        .fail(function() {
          console.log('Fetch fail');
        });
    }
  },

  // Show a new ViewClass in region, passing viewOptions
  _displayView: function(region, ViewClass, viewOptions) {
    region.show(new ViewClass(viewOptions));
  },

  // Verify that the user put together a configuration that makes sense.
  // If not, the method throws an error
  _verifyConfiguration: function() {
    if (!this.views) { return; }
    _.each(this.views, function(viewDefinition, viewName) {
      this._ensureRegions(viewDefinition, viewName);
      this._ensureData(viewDefinition, viewName);
    }, this);
  },

  _ensureRegions: function(viewDefinition, viewName) {
    var regionName = viewDefinition.region;
    if (!regionName) {
      throw new Error('A region must be specified for each view.');
    }
    var host = this.parent ? this.parent : this._router;
    var region = host.getRegion(regionName);
    if (!region) {
      throw new Error('The specified region, ' + regionName + ', does not exist.');
    }
  },

  // Ensure that all of our data for our views is defined
  _ensureData: function(viewDefinition, viewName) {
    var model = viewDefinition.model;
      var collection = viewDefinition.collection;
      if (model && !this.data[model]) {
        throw new Error('The data object "' + model + '" was not found for view "' + viewName + '"');
      }
      if (collection && !this.data[collection]) {
        throw new Error('The data object "' + collection + '" was not found for view "' + viewName + '"');
      }
  },

  _shouldFetch: function(dataName, navigateOptions) {

    // If there's no name given, then there's nothing to fetch!
    if (!dataName) { return false; }

    var resetCache = navigateOptions.resetCache;

    // Always fetch if `resetCache` is true
    if (resetCache === true) { return true; }

    // Also support an array syntax to `resetCache` for finer control over the cache
    if (_.isArray(resetCache) && _.contains(resetCache, dataName)) { return true; }

    // If the data isn't cached yet, then we know we must fetch
    if (!this._dataCached(dataName)) {
      return true;
    }

    var dataDefinition = this.data[dataName];

    // If the cache isn't set, then we default it to true
    dataDefinition.cache = !_.isBoolean(dataDefinition.cache) ? true : dataDefinition.cache;

    // Return the opposite of the cache. If we don't want to cache, then we always fetch.
    return !dataDefinition.cache;
  },

  _dataCached: function(dataName) {
    return !!this._data[dataName];
  },

  _getDataObj: function(dataName, urlData) {
    if (!dataName) { return; }

    var cachedObj = this._data[dataName];

    if (!cachedObj) {
      this._data[dataName] = new (result(this.data[dataName], 'dataClass', urlData))();
    }

    return this._data[dataName];
  },

  _getViewRegion: function(regionName) {
    var host = this.parent ? this.parent : this._router;
    return host.getRegion(regionName);
  },

  // Determine if we need to fetch the data
  _fetchData: function(dataName) {
    var dataObj = this.data[dataName];

    // If we're not supposed to cache it, then
    // we always fetch it
    if (!dataName.cache) {
      return true;
    }

    // If we want to cache it, and there's no cached version,
    // then we still need to fetch it for the first time
    else if (dataName.cache && !this._data[dataName]) {
      return true;
    }

    // Otherwise, we don't fetch
    return false;
  },

  getDataObject: function(dataName) {
    if (!dataName) { return; }

    this.data = this.data || {};
    var dataObj = this.data[dataName];

    if (!dataObj) {
      throw new Error('The data object ' + dataName + ' must exist.');
    }

    return dataObj;
  },

  triggerMethod: mn.triggerMethod
}, bb.Events);

Route.extend = mn.extend;

module.exports = Route;
