//
// BaseRouter
// Configures auth for our StateRouter
//

import * as Radio from 'radio';
import StateRouter from 'vendor/state-router/state-router';

export default StateRouter.extend({
  initialize() {
    Radio.comply('router', 'navigate', route => {
      this.navigate(route, {trigger:true});
    });
    this.on('unauthorized', this._navigateToLogin, this);
  },

  authorize(routeData) {
    var newRoute = routeData.linked;
    return !(newRoute.authorize && !Radio.request('auth', 'authorized'));
  },

  _navigateToLogin() {
    this.navigate('login', {trigger:true});
  }
});
