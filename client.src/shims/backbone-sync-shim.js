//
// Sync Shim
// Backbone.Sync returns a jQuery Deferred. We wrap
// it to return an A+ promise.
//

import * as bb from 'backbone';

var originalSync = bb.sync;
bb.sync = function() {
  return Promise.resolve(originalSync.apply(this, arguments));
};
