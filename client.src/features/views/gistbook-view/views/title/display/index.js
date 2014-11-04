//
// Display Title View
// Shows the Gistbook's title, and the text to edit it
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
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

  initialize: function(options) {
    this.mergeOptions(options, this.displayTitleViewOptions);
    this._setClass();
  },

  // Sets whether the view is editable or not.
  _setClass: function() {
    this.$el.toggleClass('editable', this.editable);
  }
});
