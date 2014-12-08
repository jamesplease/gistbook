//
// ProfileRoute
//

import * as Radio from 'radio';
import Route from 'base/route';
import ProfileView from './views/profile-view';
import Gists from './entities/gists';
import GithubUser from './entities/github-user';

export default Route.extend({
  fetch(urlData) {
    var user = Radio.request('user', 'user');
    var isSelf = urlData.params.username === user.get('login');

    var dataOptions = {};
    if (!isSelf) {
      dataOptions.collectionUrl = '/users/' + urlData.params.username + '/gists';
    }

    var Gistbooks = Gists.extend(dataOptions);
    this.gistbooks = new Gistbooks();

    this.githubUser = this._getUser(isSelf, urlData);

    var fetchedData = [this.gistbooks.fetch({ cache: false })];

    if (!isSelf) {
      fetchedData.push(this.githubUser.fetch({ cache: false }));
    }

    return Promise.all(fetchedData);
  },

  show(data, urlData) {
    var user = Radio.request('user', 'user');
    var username = urlData.params.username;
    var profileView = new ProfileView({
      model: this.githubUser,
      collection: this.gistbooks,
      isSelf: user.get('login') === username
    });
    Radio.command('rootView', 'showIn:container', profileView);
  },

  _getUser(isSelf, urlData) {
    if (isSelf) {
      return Radio.request('user', 'user');
    } else {
      return new GithubUser({
        id: urlData.params.username
      });
    }
  }
});
