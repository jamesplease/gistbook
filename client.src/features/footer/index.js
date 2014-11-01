//
// Footer
//

var mn = require('marionette');
var FooterView = require('./footer-view');

module.exports = mn.Region.extend({
  el: 'footer',

  initialize: function() {
    this.show(new FooterView()); 
  }
});
