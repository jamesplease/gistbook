//
// ModalWrapper
// Wraps views that are displayed as modals. Provides the
// overlay mask for closing modals.
//

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var Wrapper = require('../../views/wrapper');

module.exports = Wrapper.extend({
  template: 'modalWrapper',

  className: 'modal-container',

  ui: {
    overlay: '.modal-overlay',
    close: '.close'
  },

  events: {
    'click @ui.overlay': 'destroyView',
    'click @ui.close': 'destroyView'
  },

  region: '.modal-window',

  onShowView: function(view) {
    this.$el.addClass('show');
  },

  onBeforeDestroyView: function() {
    this.$el.removeClass('show');
  }
});

