//
// AboutRoute
//

var mn = require('marionette');
var Radio = require('radio');
var AboutView = require('../features/views/about-view');

module.exports = mn.Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new AboutView());
  }
});
