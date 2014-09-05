var mn = require('marionette');
var Router = require('../lib/router');

var router = new Router({

  regions: {
    main: 'main > div'
  },

  routes: {
    ':username': require('../routes/profile'),
    '': require('../routes/home'),
    'new': require('../routes/new'),
    'logout': require('../routes/logout'),
    'settings': require('../routes/settings'),
  }
});

module.exports = router;
