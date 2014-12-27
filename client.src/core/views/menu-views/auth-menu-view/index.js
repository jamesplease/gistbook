//
// MenuView
// The menu that's displayed once you're logged in
//

import ItemView from 'base/item-view';

export default ItemView.extend({
  tagName: 'nav',
  template: 'menuView',

  ui: {
    $menuToggle: '.octicon-triangle-down',
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
    this._modifyClass('toggle');
  },

  hideMenu() {
    this._modifyClass('remove');
  },

  _modifyClass(methodName) {
    this.ui.$dropdownMask[methodName + 'Class']('show');
    this.ui.$dropdown[methodName + 'Class']('show');
    this.ui.$menuToggle[methodName + 'Class']('active');
  }
});
