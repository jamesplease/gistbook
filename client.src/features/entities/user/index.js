//
// GistbookUser
// An object that represents the user of Gistbook
//

var bb = require('backbone');
var _ = require('underscore');
var Radio = require('radio');

var userChannel = Radio.channel('user');
var authChannel = Radio.channel('auth');

var User = bb.Model.extend({
  initialize: function() {
    this._configureEvents();
  },

  _configureEvents: function() {
    userChannel.reply('user', this);
    this.listenTo(authChannel, 'logout', this.clear);
  }
});

var user = new User(window._initData.user);

module.exports = user;
