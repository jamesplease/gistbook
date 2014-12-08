//
// SettingsRoute
//

import * as Radio from 'radio';
import Route from 'base/route';
import SettingsView from './views/settings-view';

var user = Radio.request('user', 'user');

export default Route.extend({

  // Redirect us to the home page if we're unauthorized
  // This is the only page that requires that you be authorized
  redirect() {
    return !Radio.request('auth', 'authorized') ? '' : false;
  },

  show() {
    Radio.command('rootView', 'showIn:container', new SettingsView({ model: user}));
  }
});
