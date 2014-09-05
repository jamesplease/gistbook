/*
 * ProfileRoute
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var Radio = require('radio');
var ProfileView = require('../../subapps/profile/views/profile-view');
var Gists = require('../../subapps/profile/entities/gists');
var GistbookRoute = require('./gistbook');
var User = require('../../lib/entities/user');

var user = Radio.request('user', 'user');

module.exports = mn.Route.extend({
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
