/*
 * ProfileView
 *
 */

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  className: 'notification notification-info',
  template: _.template('Aw shucks, it looks like <%- login %> hasn\'t created any Gistbooks yet!')
});
