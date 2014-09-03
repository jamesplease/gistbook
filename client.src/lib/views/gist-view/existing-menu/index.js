/*
 * ExistingMenu
 * The menu to be displayed for a new Gistbook
 *
 */

var mn = require('marionette');
var templates = require('templates');

module.exports = mn.ItemView.extend({
  template: templates.existingMenu
});
