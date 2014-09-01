var mn = require('marionette');
var Router = require('../lib/router');

var router = new Router({

  regions: {
    main: 'main > div'
  },

  routes: {
    'profile/:username': require('../subapps/profile/profile-route'),
    '': require('../subapps/home/home-route'),
    'new': require('../subapps/new/new-route'),
    'logout': require('../subapps/logout/logout-route'),
    'settings': require('../subapps/settings/settings-route'),
  }
});

module.exports = router;
