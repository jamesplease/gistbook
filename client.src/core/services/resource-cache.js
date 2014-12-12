//
// Resource Cache
// Caches API resources by ETag
//

import * as bb from 'backbone';

var cache = {};

// Configure jQuery to handle resources that haven't been
// modified since the last request
bb.$.ajaxSetup({
  ifModified: true
});

// Override Backbone.ajax to save & load cached resources
bb.ajax = function(options, ...args) {
  var success = options.success;
  options.success = function(resp, textStatus, jqXHR) {
    var ETag = jqXHR.getResponseHeader('ETag');
    if (textStatus === 'notmodified') {
      resp = cache[ETag];
    } else if (ETag) {
      cache[ETag] = resp;
    }
    if (success) {
      success(resp, textStatus, jqXHR);
    }
  };
  args.unshift(options);
  return bb.$.ajax.apply(bb.$, args);
};
