//
// SettingsRoute
//

var mn = require('marionette');
var Radio = require('radio');
var SettingsView = require('../features/views/settings-view');

var user = Radio.request('user', 'user');

var SettingsRoute = mn.Route.extend({

  title: 'Account Settings',

  // Redirect us to the home page if we're unauthorized
  // This is the only page that requires that you be authorized
  redirect: function() {
    return !Radio.request('auth', 'authorized') ? '' : false;
  },

  views: {
    settings: {
      model: user,
      region: 'main',
      view: SettingsView
    }
  }
});

module.exports = SettingsRoute;
