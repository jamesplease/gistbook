/*
 * GistbookRoute
 *
 */

var mn = require('marionette');
var Radio = require('radio');
var GistView = require('../../../features/views/gist-view');
var Gist = require('../../../features/entities/gist');

var GistbookRoute = mn.Route.extend({
  data: {
    gistbook: {
      dataClass: Gist,
      initialData: function(urlData) {
        console.log('la', urlData);
        return { id: urlData.params.gistbookId };
      }
    }
  },

  views: {
    profile: {
      model: 'gistbook',
      region: 'main',
      view: GistView,
      options: function(urlData) {
        var username = Radio.request('user', 'user').get('login');
        var thisUser = urlData.params.username;
        return {
          ownGistbook: username === thisUser
        };
      }
    }
  }
});

module.exports = GistbookRoute;
