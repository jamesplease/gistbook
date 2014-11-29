//
// LogoutRoute
//

import * as Radio from 'radio';
import Route from '../../base/route';

var authChannel = Radio.channel('auth');

export default Route.extend({
  redirect: function() {
    authChannel.command('logout');
    return '';
  }
});
