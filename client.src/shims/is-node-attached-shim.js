var bb = require('backbone');
var mn = require('marionette');

mn.isNodeAttached = function(el) {
  return bb.$.contains(document.documentElement, el);
};
