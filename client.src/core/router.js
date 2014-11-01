//
// router
// The router loads up our Routes. Our Routes specify which
// features are activated whenever the URL changes.
//

var mn = require('marionette');
var Radio = require('radio');

var Router = mn.Router.extend({
  initialize: function() {
    Radio.comply('router', 'navigate', function(route) {
      this.navigate(route, {trigger:true});
    }, this);
  },

  routes: {
    '': new (require('../routes/home'))(),
    'new': new (require('../routes/new'))(),
    'about': new (require('../routes/about'))(),
    'terms': new (require('../routes/terms'))(),
    'logout': new (require('../routes/logout'))(),
    'settings': new (require('../routes/settings'))(),
    ':username': new (require('../routes/profile'))(),
    ':username/:gistbookId': new (require('../routes/profile/gistbook'))()
  }
});

module.exports = new Router();
