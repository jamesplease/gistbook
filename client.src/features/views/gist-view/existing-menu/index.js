/*
 * ExistingMenu
 * The menu to be displayed for a new Gistbook
 *
 */

var mn = require('marionette');
var Radio = require('radio');

module.exports = mn.ItemView.extend({
  existingMenuOptions: ['newGist', 'ownGistbook'],

  template: 'existingGistMenu',

  className: 'gist-menu-container-view',

  ui: {
    save: '.save-gist',
    delete: '.delete-gist',
    star: '.star-gist',
    fork: '.fork-gist',
    forkContainer: '.compound-fork-gist',
    starContainer: '.compound-star-gist',
    display: '.display-view'
  },

  triggers: {
    'click @ui.save': 'save',
  },

  events: {
    'click @ui.delete': 'onDelete'
  },

  initialize: function(options) {
    this.mergeOptions(options, this.existingMenuOptions);
  },

  onRender: function() {
    if (this.newGist) {
      this.ui.save.removeClass('hide');
      return;
    }

    if (this.ownGistbook) {
      this.ui.save.removeClass('hide');
      this.ui.delete.removeClass('hide');
    } else if (Radio.request('auth', 'authorized')) {
      this.ui.forkContainer.removeClass('hide');
    }

    if (Radio.request('auth', 'authorized')) {
      this.ui.starContainer.removeClass('hide');
    }

    this.ui.display.removeClass('hide');
  },

  onDelete: function() {
    if (window.confirm('Are you sure you want to delete this Gist?')) {
      this.trigger('delete');
    }
  }
});
