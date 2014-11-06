"use strict";
var bb = require('backbone');

var originalSync = bb.sync;
bb.sync = function() {
  return Promise.resolve(originalSync.apply(this, arguments));
};
