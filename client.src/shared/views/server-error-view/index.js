//
// Server Error View
// Displayed in the main region whenever there's an error
// response from the server. Ruh roh!
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
  errorViewOptions: ['jqXHR', 'textStatus', 'errorThrown'],

  template: 'serverErrorView',

  className: 'server-error',

  initialize(options) {
    mn.mergeOptions(this, options, this.errorViewOptions);
  }
});
