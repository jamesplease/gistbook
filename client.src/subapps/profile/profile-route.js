/*
 * ProfileRoute
 *
 */

var mn = require('marionette');
var Route = require('../../lib/route');
var ProfileView = require('./profile-view');
var GistbooksCollection = require('./gistbooks-collection');

var ProfileRoute = Route.extend({
  data: {
    gistbooks: {
      dataClass: function(urlData) {
        return GistbooksCollection.extend({
          collectionUrl: '/users/' + urlData.params.username + '/gists'
        });
      }
    } 
  },

  views: {
    profile: {
      collection: 'gistbooks',
      region: 'main',
      view: ProfileView
    }
  }
});

module.exports = ProfileRoute;
