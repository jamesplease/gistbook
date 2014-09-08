/*
 * modal
 * A singleton that stores our modal
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var ModalWrapper = require('./modal-wrapper');

var modalChannel = Radio.channel('modal');

var Modal = mn.Region.extend({
  initialize: function() {
    this.modalWrapper = new ModalWrapper();
    this.show(this.modalWrapper);
    modalChannel.comply('show', this.modalWrapper.showView);
    modalChannel.comply('hide', this.modalWrapper.destroyView);
  },

  el: '.modal'
});

var modal = module.exports = new Modal();

