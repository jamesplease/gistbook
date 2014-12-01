//
// ExistingMenu
// The menu to be displayed for a new Gistbook
//

import * as mn from 'marionette';
import * as Radio from 'radio';

export default mn.ItemView.extend({
  existingMenuOptions: ['newGist', 'ownGistbook'],

  template: 'existingGistMenu',

  className: 'gist-menu-container-view',

  ui: {
    save: '.save-gist',
    delete: '.delete-gist',
    fork: '.fork-gist',
    forkCount: '.fork-count',
    forkContainer: '.compound-fork-gist'
  },

  triggers: {
    'click @ui.save': 'click:save',
    'click @ui.fork': 'click:fork'
  },

  events: {
    'click @ui.delete': 'onClickDelete'
  },

  initialize: function(options) {
    this.mergeOptions(options, this.existingMenuOptions);
    this.on({
      'save error:save': this._resetSaveBtn,
      'delete error:delete': this._resetDeleteBtn,
      'error:fork': this._resetForkBtn
    }, this);
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
      this.ui.forkCount.text(this.model.get('forks').length);
    }
  },

  onClickSave: function() {
    this._cachedSaveHtml = this.ui.save.html();
    this.ui.save
      .width(this.ui.save.width())
      .html('Saving...')
      .prop('disabled', true);
  },

  onClickDelete: function() {
    if (window.confirm('Are you sure you want to delete this Gist?')) {
      this._cachedDeleteHtml = this.ui.delete.html();
      this.ui.delete
        .html('Deleting...')
        .prop('disabled', true);
      this.trigger('click:delete');
    }
  },

  onClickFork: function() {
    this._cachedForkHtml = this.ui.fork.html();
    this.ui.fork
      .html('Forking...')
      .prop('disabled', true);
  },

  _resetSaveBtn: function() {
    this.ui.save
      .width('auto')
      .html(this._cachedSaveHtml)
      .prop('disabled', false);
    this._cachedSaveHtml = null;
  },

  _resetDeleteBtn: function() {
    this.ui.delete
      .html(this._cachedDeleteHtml)
      .prop('disabled', false);
    this._cachedDeleteHtml = null;
  },

  _resetForkBtn: function() {
    this.ui.fork
      .html(this._cachedForkHtml)
      .prop('disabled', false);
    this._cachedForkHtml = null;
  }
});
