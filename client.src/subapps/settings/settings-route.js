/*
 * SettingsRoute
 *
 */

var mn = require('marionette');
var Radio = require('radio');
var Route = require('../../lib/route');
var SettingsView = require('./settings-view');

var authChannel = Radio.channel('auth');

var SettingsRoute = Route.extend({

  // Redirect us to the login page if we're unauthorized
  redirect: function() {
    return !authChannel.request('authorized') ? '' : false;
  },

  views: {
    login: {
      region: 'main',
      view: SettingsView
    }
  }
});

module.exports = SettingsRoute;
