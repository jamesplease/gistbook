/*
 * RevokeModal
 *
 *
 */

var mn = require('marionette');
var Radio = require('radio');

var modalChannel = Radio.channel('modal');

module.exports = mn.ItemView.extend({
  template: 'revokeModal',

  ui: {
    confirm: 'button'
  },

  events: {
    'click @ui.confirm': 'onConfirm'
  },

  onConfirm: function() {
    modalChannel.command('hide');
  }
});
