/*
 * Application
 * A fancier Marionette.Application that starts history
 * and intercepts links for you. It also gets rid of unnecessary features
 * like Marionette.Callbacks.
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');
var linkUtil = require('../util/link-util');

var startOptions = ['historyOptions'];

mn.Application = function() {
  this.initialize.apply(this, arguments);
};

_.extend(mn.Application.prototype, {
  initialize: function() {},

  // Options to pass along to Backbone.history.start if the app is
  // specified to start history
  historyOptions: {},

  start: function(options) {
    this.mergeOptions(options, startOptions);
    this.triggerMethod('before:start', this);

    // Starts history if a Router is configured
    if (this.router) {
      bb.history.start(this.historyOptions);
      linkUtil.startIntercepting();
    }

    this.triggerMethod('start', this);
  },

  triggerMethod: mn.triggerMethod
}, bb.Events);

mn.Application.extend = mn.extend;
