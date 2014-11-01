//
// Server Error View
// Displayed in the main region whenever there's an error
// response from the server. Ruh roh!
//

var mn = require('marionette');

var errorViewOptions = ['jqXHR', 'textStatus', 'errorThrown'];

module.exports = mn.ItemView.extend({
  template: 'serverErrorView',

  className: 'server-error',

  initialize: function(options) {
    this.mergeOptions(options, errorViewOptions);
  }
});
