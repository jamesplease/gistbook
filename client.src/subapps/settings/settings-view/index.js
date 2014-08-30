/*
 * SettingsView
 *
 */

var mn = require('marionette');
var templates = require('templates');

var SettingsView = mn.ItemView.extend({
  template: templates.settingsView
});

module.exports = SettingsView;
