//
// TermsRoute
//

var mn = require('marionette');
var TermsView = require('../features/views/terms-view');

module.exports = mn.Route.extend({
  views: {
    home: {
      region: 'main',
      view: TermsView
    }
  }
});
