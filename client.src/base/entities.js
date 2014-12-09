//
// BaseEntities
// These are the base models and collections. They have been
// updated to support resource caching via ETags, though
// at the cost of much duplication of Backbone code.
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import resourceCache from 'core/services/resource-cache';

var checkEtagCache = function(resp, textStatus, jqXHR, url) {
  if (textStatus === 'notmodified') {
    resp = resourceCache.get(url);
  }
  return resp;
};

var wrapError = function(model, options) {
  var error = options.error;
  options.error = function(resp) {
    if (error) { error(model, resp, options); }
    model.trigger('error', model, resp, options);
  };
};

export var BaseModel = bb.Model.extend({

  // I override fetch here instead of inventing a new `parse`
  // abstraction.
  fetch(options) {
    options = options ? _.clone(options) : {};
    if (options.parse === void 0) { options.parse = true; }
    var model = this;
    var success = options.success;
    var url = this.url();
    options.success = function(resp, textStatus, jqXHR) {
      resp = checkEtagCache(resp, textStatus, jqXHR, url);
      if (!model.set(model.parse(resp, options), options)) { return false; }
      if (success) { success(model, resp, options); }
      model.trigger('sync', model, resp, options);
    };
    wrapError(this, options);
    return this.sync('read', this, options);
  },
});

export var BaseCollection = bb.Collection.extend({
  fetch: function(options) {
    options = options ? _.clone(options) : {};
    if (options.parse === void 0) { options.parse = true; }
    var success = options.success;
    var url = _.result(this, 'url');
    var collection = this;
    options.success = function(resp, textStatus, jqXHR) {
      resp = checkEtagCache(resp, textStatus, jqXHR, url);
      var method = options.reset ? 'reset' : 'set';
      collection[method](resp, options);
      if (success) { success(collection, resp, options); }
      collection.trigger('sync', collection, resp, options);
    };
    wrapError(this, options);
    return this.sync('read', this, options);
  }
});
