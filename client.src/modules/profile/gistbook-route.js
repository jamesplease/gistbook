//
// GistbookRoute
//

import * as Radio from 'radio';
import Route from 'base/route';
import GistView from 'shared/views/gist-view';
import Gist from 'shared/entities/gist';

export default Route.extend({
  fetch(urlData) {
    this.gistbook = new Gist({
      id: urlData.params.gistbookId
    });
    return this.gistbook.fetch({ cache: false });
  },

  show(data, urlData) {
    var username = urlData.params.username;
    var user = Radio.request('user', 'user');
    var view = new GistView({
      model: this.gistbook,
      ownGistbook: user.get('login') === username
    });
    Radio.command('rootView', 'showIn:container', view);
  }
});
