//
// toJsonShim
// Marionette v2.x Views use toJSON for serialization, which isn't
// the intended use of that method. This resolves that problem.
//

import * as _ from 'underscore';
import * as mn from 'marionette';

mn.View.prototype.serializeModel = function(model) {
  model = model || this.model;
  return _.clone(model.attributes);
};

mn.ItemView.prototype.serializeCollection = function(collection) {
  return collection.map(function(model){ return this.serializeModel(model); }, this);
};
