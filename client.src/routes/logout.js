//
// LogoutRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';

var authChannel = Radio.channel('auth');

export default mn.Route.extend({
  redirect: function() {
    authChannel.command('logout');
    return '';
  }
});
