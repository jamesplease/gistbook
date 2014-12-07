//
// ModalWrapper
// Provides the wrapping element for views you wish to
// display as modals. Also manages the screen overlay.
//

import Wrapper from '../wrapper';
import * as Radio from 'radio';

var modalChannel = Radio.channel('modal');
var overlayChannel = Radio.channel('overlay');

var ModalWrapper = Wrapper.extend({
  template: 'modalWrapper',

  className: 'modal-wrapper',

  ui: {
    close: '.close'
  },

  events: {
    'click @ui.close': 'destroyView'
  },

  region: '.modal-window',

  initialize() {
    this.listenTo(overlayChannel, 'click', this.destroyView);
    modalChannel.comply({
      show: this.showView,
      hide: this.destroyView
    }, this);
  },

  onShowView(view) {
    overlayChannel.command('show');
    this.$el.addClass('show');
  },

  onBeforeDestroyView() {
    overlayChannel.command('hide');
    this.$el.removeClass('show');
  }
});

var modalWrapper = new ModalWrapper();
modalWrapper.render();

var body = document.getElementsByTagName('body')[0];
body.appendChild(modalWrapper.el);

export default modalWrapper;
