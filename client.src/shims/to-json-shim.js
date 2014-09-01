/*
 * toJsonShim
 * Marionette v2.x Views use toJSON for serialization, which isn't
 * the intended use. This fixes that issue.
 *
 */

var _ = require('underscore');
var mn = require('marionette');

mn.View.prototype.serializeModel = function(model) {
  model = model || this.model;
  return _.clone(model.attributes);
};

mn.ItemView.prototype.serializeCollection = function(collection) {
  return collection.map(function(model){ return this.serializeModel(model); }, this);
};
