/*
 * GistView
 * Displays a Github Gist that contains a Gistbook
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var _ = require('underscore');
var Radio = require('radio');
var GistbookPage = require('../gistbook-page');
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

    if (Radio.request('auth', 'authorized')) {
      this.getRegion('menuContainer').show(this.createMenu());
      this.registerMenuListeners();
    }
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
    var pages = this.gistbookPageView.pages;
    this.gistbookPage.set('sections', pages.toJSON());
    this.gistbook.pages[0] = this.gistbookPage.toJSON();
    this._setGistbook();
    this._saveGist({newGist:false});
  },

  _create: function() {
    var pages = this.gistbookPageView.pages;
    this.gistbookPage.set('sections', pages.toJSON());
    this.gistbook.pages[0] = this.gistbookPage.toJSON();
    this._setGistbook();
    this._saveGist({newGist:true});
  },

  // Update the gist with the current gistbook
  _setGistbook: function() {
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
      .then(function() {
        console.log('success!', arguments);
      })
      .fail(function() {
        console.log('no', arguments);
      });
  },

  createMenu: function() {
    this.menu = this.isNew() ? new NewGistMenu() : new ExistingMenu();
    return this.menu;
  },

  createNewGistbook: function() {
    this.gistbookPageView = new GistbookPage({
      model: this.getGistbookPageModel(),
      newGist: this.newGist,
      ownGistbook: this.ownGistbook
    });
    return this.gistbookPageView;
  },

  // We're only rendering a single page of a Gistbook for now. Thus,
  // we first convert our Gist to a Gistbook, then we grab the first page.
  getGistbookPageModel: function() {
    var gistbookData = this.getGistbookData();
    var gistbookPage = gistbookData.pages[0];
    this.gistbookPage = new bb.Model(gistbookPage);
    return this.gistbookPage;
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

