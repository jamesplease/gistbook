//
// SettingsRoute
//

var mn = require('marionette');
var Radio = require('radio');
var SettingsView = require('../features/views/settings-view');

var user = Radio.request('user', 'user');

module.exports = mn.Route.extend({

  // Redirect us to the home page if we're unauthorized
  // This is the only page that requires that you be authorized
  redirect: function() {
    return !Radio.request('auth', 'authorized') ? '' : false;
  },

  show: function() {
    Radio.command('rootView', 'showIn:container', new SettingsView({ model: user}));
  }
});
