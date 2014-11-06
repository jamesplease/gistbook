//
// router
// The router loads up our Routes. Our Routes specify which
// features are activated whenever the URL changes.
//

"use strict";
var Radio = require('radio');
var Router = require('../vendor/routing/router').default;
var HomeRoute = require('../modules/home/home-route').default;
var NewGistbookRoute = require('../modules/new/new-route').default;
var AboutRoute = require('../modules/about/about-route').default;
var TermsRoute = require('../modules/terms/terms-route').default;
var LogoutRoute = require('../modules/logout/logout-route').default;
var SettingsRoute = require('../modules/settings/settings-route').default;
var ProfileRoute = require('../modules/profile/profile-route').default;
var GistbookRoute = require('../modules/profile/gistbook-route').default;

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

exports.default = new GistbookRouter();
