/*
 * AboutRoute
 *
 */

var mn = require('marionette');
var AboutView = require('../features/views/about-view');

module.exports = mn.Route.extend({
  views: {
    home: {
      region: 'main',
      view: AboutView
    }
  }
});
