/*
 * GistView
 * Displays a Github Gist that contains a Gistbook
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var _ = require('underscore');
var Radio = require('radio');
var GistbookPage = require('../../entities/gistbook-page');
var GistbookView = require('../gistbook-view');
var Gist = require('../../../features/entities/gist');
var NewGistMenu = require('./new-gist-menu');
var ExistingMenu = require('./existing-menu');
var gistbookUtil = require('../../../util/gistbook-util');

var gistViewOptions = ['newGist', 'ownGistbook'];

module.exports = mn.LayoutView.extend({
  className: 'home',

  template: 'gistView',

  regions: {
    gistbookContainer: '.gistbook-container',
    menuContainer: '.gist-menu-container'
  },

  initialize: function(options) {
    _.bindAll(this, '_sync');
    this.mergeOptions(options, gistViewOptions);
  },

  // Show a new Gistbook
  onBeforeShow: function() {
    this.getRegion('gistbookContainer').show(this.createNewGistbook());

    this.getRegion('menuContainer').show(this.createMenu());
    this.registerMenuListeners();
  },

  registerMenuListeners: function() {
    return this.isNew() ? this._registerNewMenuListeners() : this._registerExistingMenuListeners();
  },

  _registerNewMenuListeners: function() {
    this.listenTo(this.menu, 'save', this._create);
  },

  _registerExistingMenuListeners: function() {
    this.listenTo(this.menu, 'save', this._sync);
  },

  // Syncs the 'nested' data structure with the parent
  _sync: function() {
    var sections = this.gistbookView.sections;
    this.gistbook.pages[0].sections = sections.toJSON();
    this.gistbook.title = this.gistbookModel.get('title');
    this._setGistbook();
    this._saveGist({newGist:false});
  },

  _create: function() {
    var sections = this.gistbookView.sections;
    this.gistbook.pages[0].sections = sections.toJSON();
    this.gistbook.title = this.gistbookModel.get('title');
    this._setGistbook();
    this._saveGist({newGist:true});
  },

  // Update the gist with the current gistbook
  _setGistbook: function() {
    this.model.set('description', this.gistbook.title);
    this.model.set('files', {
      'gistbook.json': {
        content: JSON.stringify(this.gistbook)
      }
    });
  },

  // The attributes to send to the server when saved
  saveAttrs: ['description', 'files'],

  // Save the gist to Github
  _saveGist: function(options) {
    var attrs = {
      description: this.model.get('description'),
      files: this.model.get('files'),
      public: true
    };
    var saveOptions = options.newGist ? undefined : {patch:true};
    this.model.save(attrs, saveOptions)
      .then(function(gistData) {
        if (options.newGist) {
          var username = gistData.owner ? gistData.owner.login : 'anonymous';
          var url = '/' + username + '/' + gistData.id;
          Radio.command('router', 'navigate', url);
        }
      })
      .fail(function() {
        console.log('Gist not saved', arguments);
      });
  },

  createMenu: function() {
    this.menu = this.isNew() ? new NewGistMenu() : new ExistingMenu();
    return this.menu;
  },

  createNewGistbook: function() {
    this.gistbookView = new GistbookView({
      model: this.getGistbookModel(),
      newGist: this.newGist,
      ownGistbook: this.ownGistbook
    });
    return this.gistbookView;
  },

  // We're only rendering a single page of a Gistbook for now. Thus,
  // we first convert our Gist to a Gistbook, then we grab the first page.
  getGistbookModel: function() {
    var gistbookData = this.getGistbookData();
    this.gistbookModel = new bb.Model(gistbookData);
    return this.gistbookModel;
  },

  getGistbookData: function() {
    var gist = !this.isNew() ? this.model : new Gist();
    return this._convertGistToGistbook(gist);
  },

  _convertGistToGistbook: function(gist) {
    this.gistbook = !this.isNew() ? gistbookUtil.gistbookFromGist(gist) : gistbookUtil.newGistbook();
    return this.gistbook;
  },

  // Determine whether this is a new Gist or an existing one
  isNew: function() {
    return !this.model.get('id');
  }
});

