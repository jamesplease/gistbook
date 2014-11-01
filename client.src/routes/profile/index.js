//
// ProfileRoute
//

var mn = require('marionette');
var Radio = require('radio');
var ProfileView = require('../../features/views/profile-view');
var Gists = require('../../features/views/profile-view/entities/gists');
var GistbookRoute = require('./gistbook');
var GithubUser = require('../../features/entities/github-user');
var ServerErrorView = require('../../features/views/server-error-view');

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
      view: ProfileView,
      errorView: ServerErrorView
    }
  },

  routes: {
    '/:gistbookId': GistbookRoute
  }
});
