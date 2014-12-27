//
// Base Route
// The base route for this application
//

import StateRouter from '../vendor/state-router/state-router';
import rootView from '../core/views/root-view';
import loadingView from '../shared/views/loading-view';
import Error404View from '../shared/views/error-views/not-found-view';
import ErrorRateLimitView from '../shared/views/error-views/rate-limit-view';
import ErrorGenericView from '../shared/views/error-views/generic-error-view';

loadingView.render();

export default StateRouter.Route.extend({
  constructor: function() {
    this.on({
      enter: this._showLoadingView,
      error: this._showFetchErrorView
    }, this);
    StateRouter.Route.prototype.constructor.apply(this, arguments);
  },

  // Append an overlay when the app is loading
  _showLoadingView: function() {
    // Share with Google analytics that the page transition has occurred
    if (window.ga) { window.ga('send', 'pageview'); }
    rootView.getRegion('container').$el.prepend(loadingView.$el);
  },

  // If the error occurred when fetching, then we add that here
  _showFetchErrorView: function(e) {
    var errorViewOptions = {};
    var statusCode = e ? e.status : undefined;
    var rateLimit = e ? e.getResponseHeader('X-RateLimit-Remaining') : undefined;
    if (!statusCode) { return; }
    var ErrorView = ErrorGenericView;
    if (statusCode === 404) {
      ErrorView = Error404View;
    } else if (statusCode === 403 && !rateLimit) {
      ErrorView = ErrorRateLimitView;
      errorViewOptions.resetTimestamp = e.getResponseHeader('X-RateLimit-Reset');
    }
    rootView.getRegion('container').show(new ErrorView(errorViewOptions));
  }
});
