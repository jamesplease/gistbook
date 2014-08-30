/*
 * RegionsMixin
 * It's like RegionManager, except it's a mixin
 *
 */

var mn = require('marionette');
var _ = require('underscore');

var RegionsMixin = {
  addRegions: function(regionDefinitions, defaults) {
    this._regions = this._regions || {};
    if (_.isFunction(regionDefinitions)) {
      regionDefinitions = regionDefinitions.apply(this, arguments);
    }

    var regions = {};

    _.each(regionDefinitions, function(definition, name) {
      if (_.isString(definition)) {
        definition = {selector: definition};
      }

      if (definition.selector) {
        definition = _.defaults({}, definition, defaults);
      }

      var region = this.addRegion(name, definition);
      regions[name] = region;
    }, this);

    return regions;
  },

  // Add an individual region to the region manager,
  // and return the region instance
  addRegion: function(name, definition) {
    this._regions = this._regions || {};
    
    var region;

    var isObject = _.isObject(definition);
    var isString = _.isString(definition);
    var hasSelector = !!definition.selector;

    if (isString || (isObject && hasSelector)) {
      region = mn.Region.buildRegion(definition, mn.Region);
    } else if (_.isFunction(definition)) {
      region = mn.Region.buildRegion(definition, mn.Region);
    } else {
      region = definition;
    }

    this.triggerMethod('before:add:region', name, region);

    this._regions[name] = region;

    this.triggerMethod('add:region', name, region);
    return region;
  },

  // Get a region by name
  getRegion: function(name) {
    this._regions = this._regions || {};
    return this._regions[name];
  },

  // Gets all the regions contained within
  // the `regionManager` instance.
  getRegions: function(){
    this._regions = this._regions || {};
    return _.clone(this._regions);
  },

  // Remove a region by name
  removeRegion: function(name) {
    this._regions = this._regions || {};
    var region = this._regions[name];
    this._remove(name, region);

    return region;
  },

  // Empty all regions in the region manager, and
  // remove them
  removeRegions: function() {
    this._regions = this._regions || {};
    var regions = this.getRegions();
    _.each(this._regions, function(region, name) {
      this._remove(name, region);
    }, this);

    return regions;
  },

  // Empty all regions in the region manager, but
  // leave them attached
  emptyRegions: function() {
    this._regions = this._regions || {};
    var regions = this.getRegions();
    _.each(regions, function(region) {
      region.empty();
    }, this);

    return regions;
  },

  // internal method to remove a region
  _remove: function(name, region) {
    this._regions = this._regions || {};
    this.triggerMethod('before:remove:region', name, region);
    region.empty();
    region.stopListening();
    delete this._regions[name];
    this._setLength();
    this.triggerMethod('remove:region', name, region);
  }
};

module.exports = RegionsMixin;
