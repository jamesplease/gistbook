//
// modal
// A singleton that stores our modal
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import ModalWrapper from './modal-wrapper';

var modalChannel = Radio.channel('modal');

var Modal = mn.Region.extend({
  initialize: function() {
    this.modalWrapper = new ModalWrapper();
    this.show(this.modalWrapper);
    modalChannel.comply('show', this.modalWrapper.showView, this.modalWrapper);
    modalChannel.comply('hide', this.modalWrapper.destroyView, this.modalWrapper);
  },

  el: '.modal'
});

export default new Modal();

