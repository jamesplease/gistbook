//
// ItemView
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import toJsonShim from './mixins/to-json-shim';
import getNestedViewsShim from './mixins/get-nested-views-shim';

var ItemView = mn.ItemView.extend({

  // A shim to support triggerAttach
  // Can be removed with Marionette v2.3
  _getImmediateChildren() {
    return [];
  }
});

_.extend(ItemView.prototype, toJsonShim, getNestedViewsShim);

export default ItemView;
