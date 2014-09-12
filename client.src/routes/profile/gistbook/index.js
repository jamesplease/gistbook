/*
 * GistbookRoute
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var GistView = require('../../../features/views/gist-view');
var Gist = require('../../../features/entities/gist');
var ServerErrorView = require('../../../features/views/server-error-view');

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
      getViewClass: function(options) {
        var gistData = options.data[0];
        var gistOwner = gistData.owner;
        var gistUser = gistOwner ? gistOwner.login : 'anonymous';
        var username = options.urlData.params.username;
        return gistUser === username ? GistView : ServerErrorView;
      },
      errorView: ServerErrorView,
      options: function(urlData) {
        var username = Radio.request('user', 'user').get('login');
        var thisUser = urlData.params.username;
        return {
          ownGistbook: username === thisUser
        };
      }
    }
  }
});

module.exports = GistbookRoute;
