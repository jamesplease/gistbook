//
// SettingsRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import Route from '../lib/routing/route';
import SettingsView from '../features/views/settings-view';

var user = Radio.request('user', 'user');

export default Route.extend({

  // Redirect us to the home page if we're unauthorized
  // This is the only page that requires that you be authorized
  redirect: function() {
    return !Radio.request('auth', 'authorized') ? '' : false;
  },

  show: function() {
    Radio.command('rootView', 'showIn:container', new SettingsView({ model: user}));
  }
});
