/*
 * MenuView
 * The menu that's displayed once you're logged in
 *
 */

var mn = require('marionette');

var MenuView = mn.ItemView.extend({
  tagName: 'nav',
  template: 'menuView',

  ui: {
    $menuToggle: '.octicon-three-bars',
    $menuItem: '.dropdown-menu a',
    $dropdown: '.dropdown-menu',
    $dropdownMask: '.dropdown-mask'
  },

  events: {
    'click @ui.$menuItem': 'hideMenu',
    'click @ui.$dropdownMask': 'hideMenu',
    'click @ui.$menuToggle': 'toggleMenu'
  },

  toggleMenu: function() {
    this.ui.$dropdownMask.toggleClass('show');
    this.ui.$dropdown.toggleClass('show');
  },

  showMenu: function() {
    this.ui.$dropdownMask.addClass('show');
    this.ui.$dropdown.addClass('show');
  },

  hideMenu: function() {
    this.ui.$dropdownMask.removeClass('show');
    this.ui.$dropdown.removeClass('show');
  }
});

module.exports = MenuView;
