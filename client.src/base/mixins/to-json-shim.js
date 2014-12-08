//
// toJSON
// Ensure that the serialize methods don't use toJSON
// This code can be removed when Marionette hits v3
//

import * as _ from 'underscore';

export default {
  serializeModel(model) {
    model = model || this.model;
    return _.clone(model.attributes);
  },

  serializeCollection(collection) {
    return collection.map(function(model) {
      return this.serializeModel(model);
    }, this);
  }
};
