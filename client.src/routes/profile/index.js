/*
 * ProfileRoute
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var Radio = require('radio');
var ProfileView = require('../../features/profile-view');
var Gists = require('../../features/profile-view/entities/gists');
var GistbookRoute = require('./gistbook');
var GithubUser = require('../../features/entities/github-user');

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
      dataClass: GithubUser,
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
