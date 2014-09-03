/*
 * GistbookRoute
 *
 */

var mn = require('marionette');
var Route = require('../../../../lib/route');
var GistView = require('../../../../lib/views/gist-view');
var Gist = require('../../../../lib/entities/gist');

var GistbookRoute = Route.extend({
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
