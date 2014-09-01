/*
 * HomeView
 * Let's make a Gistbook!
 *
 */

var mn = require('marionette');
var _ = require('underscore');
var templates = require('templates');

var HomeView = mn.ItemView.extend({
  className: 'profile',
  template: _.template('Welcome home.')
});

module.exports = HomeView;
