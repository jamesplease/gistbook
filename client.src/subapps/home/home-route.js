/*
 * HomeRoute
 * Home is where we make a Gistbook
 *
 */

var $ = require('jquery');
var mn = require('marionette');
var Route = require('../../lib/route');
var HomeView = require('./home-view');
var GithubCollection = require('../../lib/github-collection');

var HomeRoute = Route.extend({
  views: {
    home: {
      region: 'main',
      view: HomeView
    }
  }
});

module.exports = HomeRoute;
