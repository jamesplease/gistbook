/*
 * GistbookRoute
 *
 */

var mn = require('marionette');
var GistView = require('../../../features/views/gist-view');
var Gist = require('../../../features/entities/gist');

var GistbookRoute = mn.Route.extend({
  data: {
    gistbook: {
      dataClass: Gist,
      initialData: function(urlData) {
        return { id: urlData.params.gistbookId };
      }
    }
  },

  views: {
    profile: {
      model: 'gistbook',
      region: 'main',
      view: GistView
    }
  }
});

module.exports = GistbookRoute;
