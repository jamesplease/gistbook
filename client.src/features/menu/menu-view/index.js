/*
 * MenuView
 * The menu that's displayed once you're logged in
 *
 */

var mn = require('marionette');
var templates = require('templates');

var MenuView = mn.ItemView.extend({
  tagName: 'nav',
  template: templates.menuView
});

module.exports = MenuView;
