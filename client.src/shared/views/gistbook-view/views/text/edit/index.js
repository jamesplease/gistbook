//
// textEditView
// Modify text based on a textarea
//

import * as _ from 'underscore';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: _.template('<%= source %>'),

  tagName: 'textarea',

  className: 'gistbook-textarea',

  // Get the value of the element
  value() {
    return this.el.value;
  }
});
