/*
 * LoginView
 * A view that displays our login button in the
 * header
 *
 */

var mn = require('marionette');
var templates = require('templates');

var LoginView = mn.ItemView.extend({
  template: templates.loginView
});

module.exports = LoginView;
