/*
 * NewGistMenu
 * The menu to be displayed for a new Gistbook
 *
 */

var mn = require('marionette');
var Radio = require('radio');

module.exports = mn.ItemView.extend({
  template: 'newGistMenu',

  ui: {
    save: '.save-gist'
  },

  events: {
    'click @ui.save': 'save'
  },

  save: function() {
    if (!Radio.request('auth', 'authorized')) {
      if (window.confirm('Gistbooks created anonymously cannot be edited once saved. Are you sure you are ready to save?')) {
        this.triggerSave();
      }
    } else {
      this.triggerSave();
    }
  },

  triggerSave: function() {
    this.trigger('save');
  }
});
