/*
 * HomeRoute
 * Home is where we make a Gistbook
 *
 */

var mn = require('marionette');
var Route = require('../../lib/route');
var HomeView = require('./home-view');

var HomeRoute = Route.extend({
  views: {
    login: {
      region: 'main',
      view: HomeView
    }
  }
});

module.exports = HomeRoute;
