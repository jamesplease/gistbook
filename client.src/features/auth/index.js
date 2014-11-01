//
// auth
// Manages anything and everything related to 
// authorization
//

var $ = require('jquery');
var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var cookies = require('cookies-js');

var Auth = mn.Object.extend({

  // Start things up here
  initialize: function() {
    this.channel = Radio.channel('auth');
    this.authorized = false;
    this.token = '';
    this.determineLogin();
    this.configureEvents();
    this._configureAjax();
  },

  // Log us out by destroying the token
  logout: function() {
    cookies.expire('token');
    this.authorized = false;
    this.token = '';
    this.channel.trigger('logout');
  },

  // Determine if we're authorized based on the cookie
  determineLogin: function() {
    var token = cookies.get('token');

    // Set the status of our authorization
    if (token) {
      this.authorized = true;
      this.token = token;
    } else {
      this.authorized = false;
    }

    // Trigger it on the channel, and register it as a request
    this.channel.trigger('authorize', {
      token: this.token,
      authorized: this.authorized
    });
  },

  // Register our events on the channel
  configureEvents: function() {
    this.channel.reply('authorized', function() {
      return this.authorized;
    }, this);
    this.channel.reply('token', function() {
      return this.token;
    }, this);
    this.channel.comply('logout', this.logout, this);
  },

  // Include our token in every subsequent request
  _configureAjax: function() {
    var self = this;
    $.ajaxSetup({
      beforeSend: function (jqXHR, settings) {
        if (self.authorized) {
          jqXHR.setRequestHeader('Authorization', 'token ' + self.token);
        }
        return true;
    }
    });
  }
});

module.exports = Auth;
