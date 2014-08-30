/*
 * auth
 * Manages whether we're authorized or not
 *
 */

var mn = require('marionette');
var _ = require('underscore');
var Radio = require('radio');
var cookies = require('cookies-js');

var AuthManager = mn.Object.extend({

  // Start things up here
  initialize: function() {
    _.bindAll(this, 'logout');
    this.channel = Radio.channel('auth');
    this.authorized = false;
    this.token = '';
    this.determineLogin();
    this.configureEvents();
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
    this.channel.comply('logout', this.logout);
  }
});

module.exports = new AuthManager();
