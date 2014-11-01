//
// getNestedViews
// A shim for a Marionette 2.3 feature.
// Triggers the attach method on children views
//

var _ = require('underscore');
var mn = require('marionette');

_.extend(mn.Region.prototype, {
  show: function(view, options){
    this._ensureElement();

    var showOptions     = options || {};
    var isDifferentView = view !== this.currentView;
    var preventDestroy  = !!showOptions.preventDestroy;
    var forceShow       = !!showOptions.forceShow;

    // We are only changing the view if there is a current view to change to begin with
    var isChangingView = !!this.currentView;

    // Only destroy the current view if we don't want to `preventDestroy` and if
    // the view given in the first argument is different than `currentView`
    var _shouldDestroyView = isDifferentView && !preventDestroy;

    // Only show the view given in the first argument if it is different than
    // the current view or if we want to re-show the view. Note that if
    // `_shouldDestroyView` is true, then `_shouldShowView` is also necessarily true.
    var _shouldShowView = isDifferentView || forceShow;

    if (isChangingView) {
      this.triggerMethod('before:swapOut', this.currentView);
    }

    if (_shouldDestroyView) {
      this.empty();
    }

    if (_shouldShowView) {

      // We need to listen for if a view is destroyed
      // in a way other than through the region.
      // If this happens we need to remove the reference
      // to the currentView since once a view has been destroyed
      // we can not reuse it.
      view.once('destroy', _.bind(this.empty, this));
      view.render();

      if (isChangingView) {
        this.triggerMethod('before:swap', view);
      }

      this.triggerMethod('before:show', view);
      mn.triggerMethodOn(view, 'before:show');

      if (isChangingView) {
        this.triggerMethod('swapOut', this.currentView);
      }

      // An array of views that we're about to display
      var attachedRegion = mn.isNodeAttached(this.el);

      // The views that we're about to attach to the document
      // It's important that we prevent _getNestedViews from being executed unnecessarily
      // as it's a potentially-slow method
      var displayedViews = [];

      var triggerBeforeAttach = showOptions.triggerBeforeAttach || this.triggerBeforeAttach;
      var triggerAttach = showOptions.triggerAttach || this.triggerAttach;

      if (attachedRegion && triggerBeforeAttach) {
        displayedViews = _.union([view], _.result(view, '_getNestedViews') || []);
        this._triggerAttach(displayedViews, 'before:');
      }
      this.attachHtml(view);
      this.currentView = view;
      if (attachedRegion && triggerAttach) {
        displayedViews = _.union([view], _.result(view, '_getNestedViews') || []);
        this._triggerAttach(displayedViews);
      }

      if (isChangingView) {
        this.triggerMethod('swap', view);
      }

      this.triggerMethod('show', view);
      mn.triggerMethodOn(view, 'show');

    }

    return this;
  },

  triggerBeforeAttach: true,
  triggerAttach: true,

  _triggerAttach: function(views, prefix) {
    var eventName = (prefix || '') + 'attach';
    _.each(views, function(view) {
      mn.triggerMethodOn(view, eventName, view, this);
    }, this);
  }
});

