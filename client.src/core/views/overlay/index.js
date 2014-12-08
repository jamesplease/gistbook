//
// Overlay
// A simple Backbone View that can be used to mask your application
// The overlay z-index is 10000, so anything below that is masked
//

import * as Radio from 'radio';
import ItemView from 'base/item-view';

var overlayChannel = Radio.channel('overlay');

var Overlay = ItemView.extend({
  className: 'overlay',

  template: false,

  initialize() {
    overlayChannel.comply({
      show: this.show,
      hide: this.hide
    }, this);
  },

  triggers: {
    click: 'click'
  },

  onClick() {
    overlayChannel.trigger('click');
  },

  show() {
    this.$el.addClass('visible');
  },

  hide() {
    this.$el.removeClass('visible');
  }
});
var overlay = new Overlay();

var body = document.getElementsByTagName('body')[0];
body.appendChild(overlay.el);

export default overlay;
