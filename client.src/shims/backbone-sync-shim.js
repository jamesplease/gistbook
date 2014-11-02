import * as bb from 'backbone';

var originalSync = bb.sync;
bb.sync = function() {
  return Promise.resolve(originalSync.apply(this, arguments));
};
