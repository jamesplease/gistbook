//
// GistbookRoute
//

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var GistView = require('../../../features/views/gist-view');
var Gist = require('../../../features/entities/gist');
var ServerErrorView = require('../../../features/views/server-error-view');

module.exports = mn.Route.extend({
  fetch: function(urlData) {
    this.gistbook = new Gist({
      id: urlData.params.gistbookId
    });
    return this.gistbook.fetch();
  },

  onFetchError: function() {
    Radio.command('rootView', 'showIn:container', new ServerErrorView());
  },

  show: function(data, urlData) {
    var gistOwner = this.gistbook.get('owner');
    var gistUser = gistOwner ? gistOwner.login : 'anonymous';
    var username = urlData.params.username;
    var View = gistUser === username ? GistView : ServerErrorView;
    var user = Radio.request('user', 'user');
    var view = new View({
      model: this.gistbook,
      ownGistbook: user.get('login') === username
    });
    Radio.command('rootView', 'showIn:container', view);
  }
});
