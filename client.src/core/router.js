var mn = require('marionette');
var Router = require('../lib/router');

var router = new Router({

  regions: {
    main: 'main > div'
  },

  routes: {
    '': require('../subapps/home/home-route'),
    'new': require('../subapps/new/new-route'),
    'logout': require('../subapps/logout/logout-route'),
    'settings': require('../subapps/settings/settings-route'),
    'jmeas': require('../subapps/profile/profile-route'),
  }
});

module.exports = router;
