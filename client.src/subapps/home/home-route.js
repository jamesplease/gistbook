/*
 * HomeRoute
 * Home is where we make a Gistbook
 *
 */

var mn = require('marionette');
var Route = require('../../lib/route');
var Gist = require('../../lib/entities/gist');
var GistView = require('../../lib/views/gist-view');

module.exports = Route.extend({
  views: {
    home: {
      model: function() {
        return new Gist();
      },
      region: 'main',
      view: GistView
    }
  }
});
