//
// HomeRoute
// Home is where we make a Gistbook
//

var mn = require('marionette');
var Radio = require('radio');
var Gist = require('../features/entities/gist');
var GistView = require('../features/views/gist-view');

module.exports = mn.Route.extend({
  show: function() {
    var gistView = new GistView({
      model: new Gist(),
      newGist: true
    });
    Radio.command('rootView', 'showIn:container', gistView);
  }
});
