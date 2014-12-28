//
// textEditView
// Modify text based on a textarea
//

import ItemView from 'base/item-view';

export default ItemView.extend({
  template: 'editTextView',

  tagName: 'textarea',

  className: 'gistbook-textarea',

  // Get the value of the element,
  // stripping line breaks from the
  // start and end
  value() {
    return this.el.value.replace(/^\s+|\s+$/g, '');
  }
});
