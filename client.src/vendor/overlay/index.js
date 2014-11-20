//
// Overlay
// A simple Backbone View that can be used to mask your application
// The overlay z-index is 10000, so anything below that is masked
//

import * as mn from 'marionette';
import * as Radio from 'radio';

var overlayChannel = Radio.channel('overlay');

var Overlay = mn.ItemView.extend({
  className: 'overlay',

  template: false,

  initialize: function() {
    overlayChannel.comply({
      show: this.show,
      hide: this.hide
    }, this);
  },

  triggers: {
    click: 'click'
  },

  onClick: function() {
    overlayChannel.trigger('click');
  },

  show: function() {
    this.$el.addClass('visible');
  },

  hide: function() {
    this.$el.removeClass('visible');
  }
});
var overlay = new Overlay();

var body = document.getElementsByTagName('body')[0];
body.appendChild(overlay.el);

export default overlay;
