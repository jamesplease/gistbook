/*
 * LogoutRoute
 *
 */

var mn = require('marionette');
var Radio = require('radio');
var Route = require('../../lib/route');

var authChannel = Radio.channel('auth');

var LogoutRoute = Route.extend({
  redirect: function() {
    authChannel.command('logout');
    return '';
  }
});

module.exports = LogoutRoute;
