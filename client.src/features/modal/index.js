//
// modal
// A singleton that stores our modal
//

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var ModalWrapper = require('./modal-wrapper');

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

var modal = module.exports = new Modal();

