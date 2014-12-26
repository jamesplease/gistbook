/* jshint maxstatements: 30, maxcomplexity: 7 */

import * as _ from 'underscore';
import * as BaseRouter from 'backbone.base-router';
import Route from './route';

var StateRouter = BaseRouter.extend({
  onNavigate(routeData) {
    var newRoute = routeData.linked;

    if (!(newRoute instanceof Route)) {
      throw new Error('A Route object must be associated with each route.');
    }

    var redirect = _.result(newRoute, 'redirect');
    if (_.isString(redirect)) {
      this.navigate(redirect, {trigger:true});
      newRoute.triggerMethod('redirect', routeData);
      this.trigger('redirect', routeData);
      return;
    }

    if (this.authenticate && !this.authenticate(routeData)) {
      newRoute.triggerMethod('unauthorized', routeData);
      this.trigger('unauthorized', routeData);
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.triggerMethod('exit', routeData);
    }
    this.currentRoute = newRoute;
    newRoute.triggerMethod('enter', routeData);

    if (!newRoute.fetch) {
      newRoute.show(undefined, routeData);
      newRoute.triggerMethod('show', routeData);
    } else {

      // Wait for the data to come back, then
      // show the view if the route is still active.
      Promise.resolve(newRoute.fetch(routeData))
        .then(data => {
          newRoute.triggerMethod('fetch', routeData, data);
          if (newRoute !== this.currentRoute) { return; }
          newRoute.show(data, routeData);
          newRoute.triggerMethod('show', routeData);
        })
        .catch(e => {
          if (newRoute !== this.currentRoute) { return; }
          newRoute.triggerMethod('error', e, routeData);
        });
    }
  }
});

StateRouter.Route = Route;

export default StateRouter;
