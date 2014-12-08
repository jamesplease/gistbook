//
// Base Route
// The base route for this application
//

import StateRouter from 'vendor/state-router/state-router';
import rootView from 'core/views/root-view';
import loadingView from 'shared/views/loading-view';
import ServerErrorView from 'shared/views/server-error-view';

loadingView.render();

export default StateRouter.Route.extend({
  onEnter() {
    // Share with Google analytics that the page transition has occurred
    if (window.ga) { window.ga('send', 'pageview'); }
    rootView.getRegion('container').$el.prepend(loadingView.$el);
  },

  onError() {
    rootView.getRegion('container').show(new ServerErrorView());
  }
});
