//
// menu
// Manages the application's menu
//

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var LoginView = require('./login-view');
var MenuView = require('./menu-view');

var authChannel = Radio.channel('auth');

var Menu = mn.Object.extend({
  initialize: function(options) {
    this.region = new mn.Region({el: 'header .menu'});
    this._showView();
    this._configureEvents();
  },

  // Show the initial view based on whether we're authorized or not
  _showView: function() {
    var View = this._getInitialView();
    var model = this._getModel();
    this.region.show(new View({
      model: model
    }));
  },

  // Return the view we use for the initial render based on whether
  // we're authorized or not
  _getInitialView: function() {
    return authChannel.request('authorized') ? MenuView : LoginView;
  },

  _getModel: function() {
    return authChannel.request('authorized') ? Radio.request('user', 'user') : undefined;
  },

  _configureEvents: function() {
    this.listenTo(authChannel, 'logout', this._showView);
  }
});

module.exports = Menu;
