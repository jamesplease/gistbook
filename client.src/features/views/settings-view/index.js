/*
 * SettingsView
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var RevokeModalView = require('./revoke-modal');
var scopeMap = require('../../../util/scope-map');

var SettingsView = mn.ItemView.extend({
  template: 'settingsView',

  className: 'settings',

  ui: {
    revoke: 'button.danger'
  },

  events: {
    'click @ui.revoke': 'onRevoke'
  },

  templateHelpers: {

    // Attempts to find a user-friendly version of the scope name
    mapScope: function(scopeName) {
      return _.result(scopeMap, scopeName) || scopeName;
    }
  },

  onRevoke: function() {
    Radio.command('modal', 'show', new RevokeModalView());
  }
});

module.exports = SettingsView;
