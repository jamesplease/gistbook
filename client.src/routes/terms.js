//
// TermsRoute
//

var mn = require('marionette');
var Radio = require('radio');
var TermsView = require('../features/views/terms-view');

module.exports = mn.Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new TermsView());
  }
});
