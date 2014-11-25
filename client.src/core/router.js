//
// router
// The router loads up our Routes. Our Routes specify which
// features are activated whenever the URL changes.
//

import * as Radio from 'radio';
import Router from '../vendor/routing/router';
import HomeRoute from '../modules/home/home-route';
import AboutRoute from '../modules/about/about-route';
import TermsRoute from '../modules/terms/terms-route';
import NewGistbookRoute from '../modules/new/new-route';
import LogoutRoute from '../modules/logout/logout-route';
import ContactRoute from '../modules/contact/contact-route';
import ProfileRoute from '../modules/profile/profile-route';
import GistbookRoute from '../modules/profile/gistbook-route';
import SettingsRoute from '../modules/settings/settings-route';

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
    'contact': new ContactRoute(),
    'settings': new SettingsRoute(),
    ':username': new ProfileRoute(),
    ':username/:gistbookId': new GistbookRoute()
  }
});

export default new GistbookRouter();
