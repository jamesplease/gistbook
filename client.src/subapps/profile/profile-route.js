/*
 * ProfileRoute
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var Radio = require('radio');
var Route = require('../../lib/route');
var ProfileView = require('./views/profile-view');
var Gists = require('./entities/gists');
var GistbookRoute = require('./subroutes/gistbook/gistbook-route');
var User = require('../../lib/entities/user');

var user = Radio.request('user', 'user');

module.exports = Route.extend({
  data: {
    gistbooks: {
      getDataClass: function(urlData) {
        var dataOptions = {};
        if (urlData.params.username !== user.get('login')) {
          dataOptions.collectionUrl = '/users/' + urlData.params.username + '/gists';
        }

        return Gists.extend(dataOptions);
      }
    },
    user: {
      dataClass: User,
      initialData: function(urlData) {
        return { id: urlData.params.username };
      },
      cache: false
    }
  },

  views: {
    profile: {
      model: 'user',
      collection: 'gistbooks',
      region: 'main',
      view: ProfileView
    }
  },

  routes: {
    '/:gistbookId': GistbookRoute
  }
});
