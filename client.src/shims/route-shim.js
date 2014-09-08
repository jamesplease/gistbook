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
  'data',
  'title'
];

// An alternate version of _.result that
// accepts arguments
function result(obj, prop) {
  if (obj === null) { return; }
  if (!_.isFunction(obj[prop])) {
    return obj[prop];
  } else {
    return obj[prop].apply(obj, _.rest(arguments, 2));
  }
}

mn.Route = function(options) {
  options = options || {};
  _.bindAll(this, '_callback', '_buildView');
  _.extend(this, _.pick(options, routeOptions));

  // This is our data cache
  this._data = {};
  this.data = this.data || {};
};

_.extend(mn.Route.prototype, {

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
    var model = this._getDataObj(viewDefinition.model, urlData, fetchModel);
    var collection = this._getDataObj(viewDefinition.collection, urlData, fetchCollection);

    var definitionOptions = result(viewDefinition, 'options', urlData);

    var viewOptions = _.extend({}, definitionOptions, {
      model: model, collection: collection
    });

    if (!fetchModel && !fetchCollection) {
      this._displayView(region, viewDefinition.view, viewOptions);
    } else {
      var route = this;
      var fetchCollectionPromise = fetchCollection ? _.result(collection, 'fetch') : undefined;
      var fetchModelPromise = fetchModel ? _.result(model, 'fetch') : undefined;
      $.when(fetchModelPromise, fetchCollectionPromise)
        .then(function() {
          route._displayView(region, viewDefinition.view, viewOptions);
        })
        .fail(function() {
          console.log('[Route] Fetch error!');
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
      if (model && _.isString(model) && !this.data[model]) {
        throw new Error('The data object "' + model + '" was not found for view "' + viewName + '"');
      }
      if (collection && _.isString(collection) && !this.data[collection]) {
        throw new Error('The data object "' + collection + '" was not found for view "' + viewName + '"');
      }
  },

  _shouldFetch: function(dataName, navigateOptions) {

    // If there's no name given, then there's nothing to fetch!
    if (!dataName) { return false; }

    // If it isn't a string, and it doesn't have a URL, then we can't fetch it
    if (!_.isString(dataName) && (!_.result(this, 'urlRoot') || !_.result(this.collection, 'url'))) { return false; }

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

  _getDataObj: function(dataName, urlData, avoidCache) {
    if (!dataName) { return; }

    // Functions that return a DataClass
    if (_.isFunction(dataName)) {
      return dataName(urlData);
    }

    // Presumably the DataClass itself
    if (!_.isString(dataName)) {
      return dataName;
    }

    // A cached version of the data object
    if (!avoidCache) {
      var cachedObj = this._data[dataName];

      if (!cachedObj) {
        this._data[dataName] = this._createNewDataObj(this.data[dataName], urlData);
      }

      return this._data[dataName];
    }

    // Otherwise, create a new one
    return this._createNewDataObj(this.data[dataName], urlData);
  },

  // Build a new object from a function, or constructor function
  _createNewDataObj: function(dataDefinition, urlData) {
    var DataClass = dataDefinition.dataClass ? dataDefinition.dataClass : dataDefinition.getDataClass(urlData);
    var dataOptions = this._getDataOptions(dataDefinition, urlData);
    var initialData = this._getInitialData(dataDefinition, urlData);
    return new DataClass(initialData, dataOptions);
  },

  // Get the options for the class
  _getDataOptions: function(dataDefinition, urlData) {
    return result(dataDefinition, 'options', urlData);
  },

  _getInitialData: function(dataDefinition, urlData) {
    return result(dataDefinition, 'initialData', urlData);
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

  triggerMethod: mn.triggerMethod
}, bb.Events);

mn.Route.extend = mn.extend;
