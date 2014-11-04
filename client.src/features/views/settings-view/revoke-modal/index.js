//
// RevokeModal
//

import * as mn from 'marionette';
import * as Radio from 'radio';

var modalChannel = Radio.channel('modal');

export default mn.ItemView.extend({
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
