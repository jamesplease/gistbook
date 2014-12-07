//
// EditHeaderView
// The edit view for the title.
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: 'editTitleView',

  className: 'edit-title-view',

  ui: {
    input: 'input',
    save: 'button',
    cancel: 'a'
  },

  events: {
    'keypress input': 'onKeypress'
  },

  triggers: {
    'click @ui.save': 'save',
    'click @ui.cancel': 'cancel'
  },

  onSave() {
    var newTitle = this.ui.input.val();
    this.model.set('title', newTitle);
  },

  onKeypress(e) {
    if (e.keyCode !== 13) {
      return;
    }
    this.triggerMethod('save');
  }
});
