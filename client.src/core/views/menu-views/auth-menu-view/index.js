//
// MenuView
// The menu that's displayed once you're logged in
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
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

  toggleMenu() {
    this.ui.$dropdownMask.toggleClass('show');
    this.ui.$dropdown.toggleClass('show');
  },

  showMenu() {
    this.ui.$dropdownMask.addClass('show');
    this.ui.$dropdown.addClass('show');
  },

  hideMenu() {
    this.ui.$dropdownMask.removeClass('show');
    this.ui.$dropdown.removeClass('show');
  }
});
