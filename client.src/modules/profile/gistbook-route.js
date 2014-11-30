//
// GistbookRoute
//

import * as Radio from 'radio';
import Route from '../../vendor/routing/route';
import GistView from '../../shared/views/gist-view';
import Gist from '../../shared/entities/gist';
import ServerErrorView from '../../shared/views/server-error-view';

export default Route.extend({
  fetch: function(urlData) {
    this.gistbook = new Gist({
      id: urlData.params.gistbookId
    });
    return this.gistbook.fetch({ cache: false });
  },

  onFetchError: function() {
    Radio.command('rootView', 'showIn:container', new ServerErrorView());
  },

  show: function(data, urlData) {
    var gistOwner = this.gistbook.get('owner');
    var gistUser = gistOwner ? gistOwner.login : 'anonymous';
    var username = urlData.params.username;
    var View = gistUser.toLowerCase() === username.toLowerCase() ? GistView : ServerErrorView;
    var user = Radio.request('user', 'user');
    var view = new View({
      model: this.gistbook,
      ownGistbook: user.get('login') === username
    });
    Radio.command('rootView', 'showIn:container', view);
  }
});
