/*
 * MenuView
 * The menu that's displayed once you're logged in
 *
 */

var mn = require('marionette');

var MenuView = mn.ItemView.extend({
  tagName: 'nav',
  template: 'menuView'
});

module.exports = MenuView;
