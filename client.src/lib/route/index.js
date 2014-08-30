/*
 * route
 * A Class that ties together data, a view, and a region
 *
 */

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

var Route = function(options) {
  options = options || {};
  _.bindAll(this, '_callback');
  _.extend(this, _.pick(options, routeOptions));
};

_.extend(Route.prototype, {

  // This is the primary callback that we register on the route change event
  // It's where all of the magic happens: data is fetched, views are rendered
  // and displayed to the user
  _callback: function() {

    // Update the page title, if one was specified.
    // Otherwise, reset the title to be the default
    this.title ? this._updateTitle() : this._router._resetTitle();

    this._buildDom();
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

  _buildDom: function() {
    if (!this.views) {
      return false;
    }
    _.each(this.views, function(viewDefinition, viewName) {
      var model = this.getDataObject(viewDefinition.model);
      var collection = this.getDataObject(viewDefinition.collection);
      var region = this._router.getRegion(viewDefinition.region);
      region.show(new viewDefinition.view({
        model: model,
        collection: collection
      }));
    }, this);
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
