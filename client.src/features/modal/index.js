/*
 * modal
 * A singleton that stores our modal
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var ModalWrapperView = require('./modal-wrapper');

var modalChannel = Radio.channel('modal');

var Modal = mn.Region.extend({
  initialize: function() {
    this.modalWrapper = new ModalWrapperView();
    this.show(this.modalWrapper);
    modalChannel.comply('show', this.modalWrapper.show);
    modalChannel.comply('hide', this.modalWrapper.hide);
  },

  el: '.modal'
});

var modal = module.exports = new Modal();

