//
// textEditView
// Modify text based on a textarea
//

import * as _ from 'underscore';
import ItemView from 'base/item-view';

export default ItemView.extend({
  template: _.template('<%= source %>'),

  tagName: 'textarea',

  className: 'gistbook-textarea',

  // Get the value of the element
  value() {
    return this.el.value;
  }
});
