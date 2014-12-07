//
// getNestedViews
// A shim for a Marionette 2.3 feature
//

import * as _ from 'underscore';
import * as mn from 'marionette';

_.extend(mn.CollectionView.prototype, {
  _getImmediateChildren() {
    return _.values(this.children._views);
  }
});

_.extend(mn.View.prototype, {
  _getImmediateChildren() {
    return [];
  },

  // Returns an array of every nested view within this view
  _getNestedViews() {
    var children = this._getImmediateChildren();

    if (!children.length) { return children; }

    var nestedViews = [];
    _.each(children, function(view) {
      if (!view._getNestedViews) { return; }
      nestedViews = nestedViews.concat(view._getNestedViews());
    });
    children = children.concat(nestedViews);
    return children;
  }
});

_.extend(mn.LayoutView.prototype, {
  _getImmediateChildren() {
    return _.chain(this.regionManager.getRegions())
      .pluck('currentView')
      .filter(function(view) { return !!view; })
      .value();
  }
});
