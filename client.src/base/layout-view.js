//
// LayoutView
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import Region from './region';
import toJsonShim from './mixins/to-json-shim';
import getNestedViewsShim from './mixins/get-nested-views-shim';

var LayoutView = mn.LayoutView.extend({
  regionClass: Region,

  // A shim to support triggerAttach
  // Can be removed with Marionette v2.3
  _getImmediateChildren() {
    return _.chain(this.regionManager.getRegions())
      .pluck('currentView')
      .filter(function(view) { return !!view; })
      .value();
  }
});

_.extend(LayoutView.prototype, toJsonShim, getNestedViewsShim);

export default LayoutView;
