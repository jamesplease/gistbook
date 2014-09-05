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
  }
});

module.exports = router;
