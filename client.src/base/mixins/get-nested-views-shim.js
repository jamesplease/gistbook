//
// getNestedViews
// Ensure that the serialize methods don't use toJSON
// This code can be removed when Marionette hits v3
//

import * as _ from 'underscore';

export default {
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
};
