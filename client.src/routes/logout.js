//
// LogoutRoute
//

var mn = require('marionette');
var Radio = require('radio');
var authChannel = Radio.channel('auth');

module.exports = mn.Route.extend({
  redirect: function() {
    authChannel.command('logout');
    return '';
  }
});
