//
// Error Rate Limit View
// When you've run into the rate limit, you will
// see this view
//

import * as Radio from 'radio';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  initialize: function(options) {
    mn.mergeOptions(this, options, this.errorRateLimitOptions);
  },
  errorRateLimitOptions: ['resetTimestamp'],
  template: 'errorRateLimitView',
  className: 'error-rate-limit',
  templateHelpers: function() {
    return {
      loggedIn: Radio.request('auth', 'authorized')
    };
  }
});
