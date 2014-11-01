var _ = require('underscore');
var mn = require('marionette');

_.extend(mn.CollectionView.prototype, {
  _getImmediateChildren: function() {
    return _.values(this.children._views);
  }
});

_.extend(mn.View.prototype, {
  _getImmediateChildren: function() {
    return [];
  },

  // Returns an array of every nested view within this view
  _getNestedViews: function() {
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
  _getImmediateChildren: function() {
    return _.chain(this.regionManager.getRegions())
      .pluck('currentView')
      .filter(function(view) { return !!view; })
      .value();
  }
});
