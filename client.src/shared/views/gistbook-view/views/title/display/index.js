//
// Display Title View
// Shows the Gistbook's title, and the text to edit it
//

import * as mn from 'marionette';
import ItemView from 'base/item-view';

export default ItemView.extend({
  template: 'displayTitleView',

  className: 'display-title-view',

  ui: {
    edit: '.gistbook-edit-text',
    editTitle: '.gistbook-title-edit'
  },

  triggers: {
    'click @ui.editTitle': 'edit'
  },

  editable: false,

  displayTitleViewOptions: ['editable'],

  initialize(options) {
    mn.mergeOptions(this, options, this.displayTitleViewOptions);
    this._setClass();
  },

  // Sets whether the view is editable or not.
  _setClass() {
    this.$el.toggleClass('editable', this.editable);
  }
});
