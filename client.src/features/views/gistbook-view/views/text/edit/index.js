//
// textEditView
// Modify text based on a textarea
//

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  template: _.template('<%- source %>'),

  tagName: 'textarea',

  className: 'gistbook-textarea',

  // Get the value of the element
  value: function() {
    return this.el.value;
  }
});
