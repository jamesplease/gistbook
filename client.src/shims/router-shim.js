/* jshint maxstatements: 20 */

import * as _ from 'underscore';
import * as mn from 'marionette';
import * as Radio from 'radio';
import * as BaseRouter from 'backbone.base-router';
import Route from './route-shim';

mn.Router = BaseRouter.extend({
  onNavigate: function(routeData) {
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
      var router = this;
      Promise.resolve(newRoute.fetch(routeData))
        .catch(function(e) {
          if (newRoute !== router.currentRoute) { return; }
          newRoute.onFetchError(e, routeData);
        })
        .then(function(data) {
          if (newRoute !== router.currentRoute) { return; }
          newRoute.show(data, routeData);
        })
        .catch(function(e) {
          newRoute.onShowError(e, routeData);
        });
    }
  }
});

export default mn.Router;
