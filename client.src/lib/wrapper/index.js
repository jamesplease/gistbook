//
// Wrapper
// A LayoutView that only supports a single child, typically
// because it 'wraps' that child to provide additional
// functionality. This is a handy class to make the API simpler
//

import * as mn from 'marionette';

var wrapperOptions = ['region'];

export default mn.LayoutView.extend({
  initialize: function(options) {
    this.mergeOptions(options, wrapperOptions);
    this._createRegions();
    this._setEvents();
  },

  _createRegions: function() {
    this.addRegion('wrapRegion', this.region);
  },

  _setEvents: function() {
    this.on('before:show', this.showWrappedView, this);
  },

  // Show the view in the region
  showView: function(view) {
    this.triggerMethod('before:show:view', view);
    this.getRegion('wrapRegion').show(view);
    this.triggerMethod('show:view', view);
  },

  // Destroy the view in the region
  destroyView: function() {
    var currentView = this.getRegion('wrapRegion').currentView;
    if (!currentView) { return false; }
    this.triggerMethod('before:destroy:view', currentView);
    this.getRegion('wrapRegion').empty();
    this.triggerMethod('destroy:view', currentView);
  }
});

