//
// router
// The router loads up our Routes. Our Routes specify which
// features are activated whenever the URL changes.
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import Router from '../lib/routing/router';
import HomeRoute from '../routes/home';
import NewGistbookRoute from '../routes/new';
import AboutRoute from '../routes/about';
import TermsRoute from '../routes/terms';
import LogoutRoute from '../routes/logout';
import SettingsRoute from '../routes/settings';
import ProfileRoute from '../routes/profile';
import GistbookRoute from '../routes/profile/gistbook';

var GistbookRouter = Router.extend({
  initialize: function() {
    Radio.comply('router', 'navigate', function(route) {
      this.navigate(route, {trigger:true});
    }, this);
  },

  routes: {
    '': new HomeRoute(),
    'new': new NewGistbookRoute(),
    'about': new AboutRoute(),
    'terms': new TermsRoute(),
    'logout': new LogoutRoute(),
    'settings': new SettingsRoute(),
    ':username': new ProfileRoute(),
    ':username/:gistbookId': new GistbookRoute()
  }
});

export default new GistbookRouter();
