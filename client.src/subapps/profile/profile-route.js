/*
 * ProfileRoute
 *
 */

var mn = require('marionette');
var Radio = require('radio');
var Route = require('../../lib/route');
var ProfileView = require('./profile-view');
var GistbooksCollection = require('./gistbooks');

var user = Radio.request('user', 'user');

// I need a better way to determine if logged in or not.
// Everything behaves differently in that situation

var ProfileRoute = Route.extend({
  data: {
    gistbooks: {
      dataClass: function(urlData) {
        var dataOptions = {};
        if (urlData.params.username !== user.get('login')) {
          dataOptions = {
            collectionUrl: '/users/' + urlData.params.username + '/gists'
          };
        }

        return GistbooksCollection.extend(dataOptions);
      }
    }
  },

  views: {
    profile: {
      model: user,
      collection: 'gistbooks',
      region: 'main',
      view: ProfileView
    }
  }
});

module.exports = ProfileRoute;
