//
// Server Error View
// Displayed in the main region whenever there's an error
// response from the server. Ruh roh!
//

import * as mn from 'marionette';

var errorViewOptions = ['jqXHR', 'textStatus', 'errorThrown'];

export default mn.ItemView.extend({
  template: 'serverErrorView',

  className: 'server-error',

  initialize: function(options) {
    this.mergeOptions(options, errorViewOptions);
  }
});
