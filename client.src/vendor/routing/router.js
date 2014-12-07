/* jshint maxstatements: 20, maxcomplexity: 7 */

import * as _ from 'underscore';
import * as Radio from 'radio';
import * as BaseRouter from 'backbone.base-router';
import Route from './route';

export default BaseRouter.extend({
  onNavigate(routeData) {
    var newRoute = routeData.linked;

    if (!(newRoute instanceof Route)) {
      throw new Error('A Route object must be associated with each route.');
    }

    var redirect = _.result(newRoute, 'redirect');
    if (_.isString(redirect)) {
      this.navigate(redirect, {trigger:true});
      return;
    }

    if (newRoute.authorize && !Radio.request('auth', 'authorized')) {
      this.navigate('login', {trigger:true});
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.triggerMethod('exit');
    }
    this.currentRoute = newRoute;
    newRoute.triggerMethod('enter');

    if (!newRoute.fetch) {
      newRoute.show(undefined, routeData);
    } else {

      // Wait for the data to come back, then
      // show the view if the route is still active.
      Promise.resolve(newRoute.fetch(routeData))
        .then(data => {
          if (newRoute !== this.currentRoute) { return; }
          newRoute.show(data, routeData);
        })
        .catch(e => {
          if (newRoute !== this.currentRoute) { return; }
          newRoute.onError(e, routeData);
        });
    }
  }
});
