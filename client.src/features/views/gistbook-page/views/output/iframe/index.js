/*
 * iframe
 * The iFrame that renders the user's code.
 *
 */

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  template: _.template('<iframe src="/output/<%= token %>"></iframe>'),

  className: 'gistbook-iframe'
});
