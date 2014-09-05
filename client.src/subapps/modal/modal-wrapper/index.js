/*
 * ModalWrapperView
 * Wraps views that are displayed as modals. Provides the
 * overlay mask for closing modals.
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var templates = require('templates');

var modalChannel = Radio.channel('modal');

module.exports = mn.LayoutView.extend({
  initialize: function() {
    _.bindAll(this, 'show', 'hide');
  },

  template: templates.modalWrapper,

  className: 'modal-container',

  ui: {
    overlay: '.modal-overlay',
    close: '.close'
  },

  events: {
    'click @ui.overlay': 'hide',
    'click @ui.close': 'hide'
  },

  regions: {
    modal: '.modal-window'
  },

  show: function(view) {
    this.getRegion('modal').show(view);
    this.$el.addClass('show');
  },

  hide: function() {
    this.$el.removeClass('show');
    this.getRegion('modal').empty();
  }
});

