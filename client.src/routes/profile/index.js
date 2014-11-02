//
// ProfileRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import GistbookRoute from './gistbook';
import ProfileView from '../../features/views/profile-view';
import Gists from '../../features/views/profile-view/entities/gists';
import GithubUser from '../../features/entities/github-user';
import ServerErrorView from '../../features/views/server-error-view';

export default mn.Route.extend({
  fetch: function(urlData) {
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
