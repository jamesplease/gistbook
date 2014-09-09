/*
 * ErrorView
 *
 */

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  template: 'errorView',
  className: 'notification notification-danger error-view'
});
