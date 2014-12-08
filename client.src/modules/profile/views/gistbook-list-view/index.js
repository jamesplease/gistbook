//
// GistbookListView
//

import ItemView from 'base/item-view';

export default ItemView.extend({
  initialize(options) {
    this.user = options.user;
    this.isSelf = options.isSelf;
  },

  className: 'gistbook-list-view',

  template: 'gistbookListView',

  ui: {
    delete: '.octicon-trashcan'
  },

  events: {
    'click @ui.delete': 'onDelete'
  },

  onDelete() {
    if (window.confirm('Are you sure you want to delete this Gistbook?')) {
      this.model.destroy();
    }
  },

  templateHelpers() {
    return {
      username: this.user.escape('login')
    };
  },

  onRender() {
    if (this.isSelf) {
      this.ui.delete.removeClass('hide');
    }
  }
});
