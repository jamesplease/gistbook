//
// auth
// Manages anything and everything related to 
// authorization
//

import * as $ from 'jquery';
import * as bb from 'backbone';
import * as Radio from 'radio';
import * as cookies from 'cookies-js';

var COOKIE_NAME = 'token';

var Auth = bb.Model.extend({
  defaults: {
    token: '',
    authorized: false
  },

  initialize() {
    this.channel = Radio.channel('auth');
    this.determineLogin();
    this.configureEvents();
    this._configureAjax();
  },

  // Log us out by destroying the token
  logout() {
    cookies.expire(COOKIE_NAME);
    this.set('authorized', false);
    this.set('token', '');
    this.channel.trigger('logout');
  },

  // Determine if we're authorized based on the cookie
  determineLogin() {
    var token = cookies.get(COOKIE_NAME);

    // Set the status of our authorization
    if (token) {
      this.set('authorized', true);
      this.set('token', token);
    } else {
      this.set('authorized', false);
    }

    // Trigger it on the channel, and register it as a request
    this.trigger('authorize', {
      token: this.get('token'),
      authorized: this.get('authorized')
    });
  },

  // Register our events on the channel
  configureEvents() {
    this.channel.reply('authorized', () => {
      return this.get('authorized');
    });
    this.channel.reply('token', () => {
      return this.get('token');
    });
    this.channel.comply('logout', this.logout, this);
  },

  // Include our token in every subsequent request
  _configureAjax() {
    var self = this;
    $.ajaxSetup({
      beforeSend(jqXHR, settings) {
        if (self.get('authorized')) {
          jqXHR.setRequestHeader('Authorization', 'token ' + self.get('token'));
        }
        return true;
      }
    });
  }
});

export default new Auth();
