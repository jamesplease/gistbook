//
// RevokeModal
//

import * as Radio from 'radio';
import ItemView from 'base/item-view';

var modalChannel = Radio.channel('modal');

export default ItemView.extend({
  template: 'revokeModal',

  ui: {
    confirm: 'button'
  },

  events: {
    'click @ui.confirm': 'onConfirm'
  },

  onConfirm() {
    modalChannel.command('hide');
  }
});
