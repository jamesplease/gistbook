/*
 * user
 * An object that represents our user
 *
 */

var bb = require('backbone');
var _ = require('underscore');
var Radio = require('radio');

var userChannel = Radio.channel('user');
var authChannel = Radio.channel('auth');

var User = bb.Model.extend({
  initialize: function() {
    _.bindAll(this, 'clear');
    this._configureEvents();
  },

  _configureEvents: function() {
    this.listenTo(authChannel, 'logout', this.clear);
  }
});

var user = new User(window._initData.user);

userChannel.reply('user', user);

module.exports = user;
