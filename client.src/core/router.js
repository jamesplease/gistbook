//
// router
// The router loads up our Routes. Our Routes specify which
// features are activated whenever the URL changes.
//

var mn = require('marionette');

var router = new mn.Router({

  regions: {
    main: 'main > div'
  },

  routes: {
    ':username': require('../routes/profile'),
    '': require('../routes/home'),
    'new': require('../routes/new'),
    'logout': require('../routes/logout'),
    'settings': require('../routes/settings'),
    'about': require('../routes/about'),
    'terms': require('../routes/terms')
  }
});

module.exports = router;
