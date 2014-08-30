/*
 * ProfileView
 *
 */

var mn = require('marionette');
var templates = require('templates');

var ProfileView = mn.ItemView.extend({
  template: templates.profileView
});

module.exports = ProfileView;
