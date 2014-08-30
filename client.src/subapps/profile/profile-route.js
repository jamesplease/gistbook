/*
 * ProfileRoute
 *
 */

var mn = require('marionette');
var Route = require('../../lib/route');
var ProfileView = require('./profile-view');

var ProfileRoute = Route.extend({

  views: {
    login: {
      region: 'main',
      view: ProfileView
    }
  }
});

module.exports = ProfileRoute;
