/*
 * ExistingMenu
 * The menu to be displayed for a new Gistbook
 *
 */

var mn = require('marionette');

module.exports = mn.ItemView.extend({
  template: 'existingMenu',

  ui: {
    save: '.save-gist'
  },

  triggers: {
    'click': 'save'
  }
});
