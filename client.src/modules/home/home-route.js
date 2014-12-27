//
// HomeRoute
// Home is a kitchen sink Gistbook that demonstrates
// all of the features of the app
//

import * as Radio from 'radio';
import Route from 'base/route';
import Gist from 'shared/entities/gist';
import GistView from 'shared/views/gist-view';

export default Route.extend({

  // We check to see if the user has a cached uri fragment in session storage.
  // If they do, then that means they logged in from some other page. If that's the case,
  // then we want to redirect them to that page.
  redirect() {
    var cachedUriFragment = sessionStorage.getItem('cachedFragment');
    if (!cachedUriFragment) { return; }
    sessionStorage.removeItem('cachedFragment');
    return cachedUriFragment;
  },

  show() {
    var gistView = new GistView({
      model: new Gist(),
      ownGistbook: false,
      homePage: true
    });
    Radio.command('rootView', 'showIn:container', gistView);
  }
});
