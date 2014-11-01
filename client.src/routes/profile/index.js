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

module.exports = mn.Route.extend({
  fetch: function(urlData) {
    console.log('requesting!');
    var user = Radio.request('user', 'user');
    var dataOptions = {};
    if (urlData.params.username !== user.get('login')) {
      dataOptions.collectionUrl = '/users/' + urlData.params.username + '/gists';
    }
    var Gistbooks = Gists.extend(dataOptions);
    this.gistbooks = new Gistbooks();

    this.githubUser = new GithubUser({
      id: urlData.params.username
    });

    return Promise.all([
      this.githubUser.fetch(),
      this.gistbooks.fetch()
    ]);
  },

  onFetchError: function() {
    Radio.command('rootView', 'showIn:container', new ServerErrorView());
  },

  show: function(data) {
    var profileView = new ProfileView({
      model: this.githubUser,
      collection: this.gistbooks
    });
    Radio.command('rootView', 'showIn:container', profileView);
  }
});
