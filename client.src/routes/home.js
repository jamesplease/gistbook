//
// HomeRoute
// Home is where we make a Gistbook
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import Gist from '../features/entities/gist';
import GistView from '../features/views/gist-view';

export default mn.Route.extend({
  show: function() {
    var gistView = new GistView({
      model: new Gist(),
      newGist: true
    });
    Radio.command('rootView', 'showIn:container', gistView);
  }
});
