//
// Rate Limit View
// When you've run into the rate limit, you will
// see this view
//

import * as _ from 'underscore';
import * as Radio from 'radio';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  initialize: function(options) {
    mn.mergeOptions(this, options, this.errorRateLimitOptions);
  },

  errorRateLimitOptions: ['resetTimestamp'],

  template: 'rateLimitView',
  
  className: 'error-rate-limit error-page',

  ui: {
    $minutesLeft: '.minutes-left',
    $secondsLeft: '.seconds-left'
  },
  
  templateHelpers: function() {
    this.now = Math.floor(Date.now() / 1000);
    var diff = this.resetTimestamp - this.now;
    return {
      minutesLeft: this._minutesLeft(diff),
      secondsLeft: this._secondsLeft(diff),
      loggedIn: Radio.request('auth', 'authorized')
    };
  },

  // The following two methods determine the # of
  // minutes & seconds in a unix timestamp. In this
  // case, the timestamp is a difference, and what we
  // get is how much longer you need to wait
  _minutesLeft: function(diff) {
    return Math.floor(diff / 60);
  },

  _secondsLeft: function(diff) {
    return diff % 60;
  },

  updateTime: function(diff) {
    this.ui.$minutesLeft.text(this._minutesLeft(diff));
    this.ui.$secondsLeft.text(this._secondsLeft(diff));
  },

  scheduleUpdate: function(diff) {
    diff--;
    this.updateTime(diff);
    if (diff) {
      this.scheduleUpdate(diff);
    } else {
      this.reload();
    }
  },

  reload: function() {
    window.document.location.reload();
  },
  
  // Ensure that scheduleUpdate is only called once per second,
  // then call it
  onRender: function() {
    this.scheduleUpdate = _.debounce(this.scheduleUpdate, 1000);
    this.scheduleUpdate(this.resetTimestamp - this.now);
  }
});
