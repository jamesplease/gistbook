/*
 * LogoutRoute
 *
 */

var mn = require('marionette');
var Radio = require('radio');

var authChannel = Radio.channel('auth');

var LogoutRoute = mn.Route.extend({
  redirect: function() {
    authChannel.command('logout');
    return '';
  }
});

module.exports = LogoutRoute;
