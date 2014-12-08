//
// Server Error View
// Displayed in the main region whenever there's an error
// response from the server. Ruh roh!
//

import * as mn from 'marionette';
import ItemView from 'base/item-view';

export default ItemView.extend({
  errorViewOptions: ['jqXHR', 'textStatus', 'errorThrown'],

  template: 'serverErrorView',

  className: 'server-error',

  initialize(options) {
    mn.mergeOptions(this, options, this.errorViewOptions);
  }
});
