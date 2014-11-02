//
// getNestedViews
// A shim for a Marionette 2.3 feature
// Determines if a node is a child of the document
//

import * as bb from 'backbone';
import * as mn from 'marionette';

mn.isNodeAttached = function(el) {
  return bb.$.contains(document.documentElement, el);
};
