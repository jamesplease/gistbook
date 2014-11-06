//
// ProfileRoute
//

import * as Radio from 'radio';
import Route from '../../vendor/routing/route';
import ProfileView from './views/profile-view';
import Gists from './entities/gists';
import GithubUser from '../../shared/entities/github-user';
import ServerErrorView from '../../shared/views/server-error-view';

export default Route.extend({
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
