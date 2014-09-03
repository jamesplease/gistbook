/*
 * GistView
 * Displays a Github Gist that contains a gistbook file
 *
 */

var mn = require('marionette');
var _ = require('underscore');
var Radio = require('radio');
var templates = require('templates');
var GistbookView = require('../gistbook-view');
var Gist = require('../../entities/gist');
var NewGistMenu = require('./new-gist-menu');
var ExistingMenu = require('./existing-menu');

module.exports = mn.LayoutView.extend({
  className: 'home',
  template: templates.gistView,
  regions: {
    gistbookContainer: '.gistbook-container',
    menuContainer: '.gist-menu-container'
  },

  // Show a new Gistbook
  onBeforeShow: function() {
    console.log('this model', this.model.toJSON());
    this.getRegion('gistbookContainer').show(this.createNewGistbook());

    if (Radio.request('auth', 'authorized')) {
      this.getRegion('menuContainer').show(this.createMenu());
    }
  },

  createMenu: function() {
    return this.isNew() ? new NewGistMenu() : new ExistingMenu();
  },

  createNewGistbook: function() {
    return new GistbookView({
      model: this.getGistbookModel()
    });
  },

  getGistbookModel: function() {
    return this.isNew() ? this.model : new Gist();
  },

  // Determine whether this is a new Gist or an existing one
  isNew: function() {
    return !this.model.get('id');
  },
});

