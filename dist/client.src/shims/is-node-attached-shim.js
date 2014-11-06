//
// getNestedViews
// A shim for a Marionette 2.3 feature
// Determines if a node is a child of the document
//

"use strict";
var bb = require('backbone');
var mn = require('marionette');

mn.isNodeAttached = function(el) {
  return bb.$.contains(document.documentElement, el);
};
