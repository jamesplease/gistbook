//
// CollectionView
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import getNestedViewsShim from './mixins/get-nested-views-shim';

var CollectionView = mn.CollectionView.extend({

  // A shim to support triggerAttach
  // Can be removed with Marionette v2.3
  _getImmediateChildren() {
    return _.values(this.children._views);
  }
});

_.extend(CollectionView.prototype, getNestedViewsShim);


export default CollectionView;
