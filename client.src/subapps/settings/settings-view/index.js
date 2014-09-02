/*
 * SettingsView
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var templates = require('templates');
var scopeMap = require('../../../lib/util/scope-map');

var SettingsView = mn.ItemView.extend({
  template: templates.settingsView,

  templateHelpers: {

    // Attempts to find a user-friendly version of the scope name
    mapScope: function(scopeName) {
      return _.result(scopeMap, scopeName) || scopeName;
    }
  }
});

module.exports = SettingsView;
