//
// GistView
// Displays a Github Gist that contains a Gistbook
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import GistbookView from '../../../vendor/gistbook-view';
import Gist from '../../entities/gist';
import ExistingMenu from '../existing-menu';
import gistbookUtil from '../../../util/gistbook-util';

var routerChannel = Radio.channel('router');

var gistViewOptions = ['newGist', 'ownGistbook'];

export default mn.LayoutView.extend({
  className: 'home',

  template: 'gistView',

  regions: {
    gistbookContainer: '.gistbook-container',
    menuContainer: '.gist-menu-container'
  },

  initialize: function(options) {
    this.mergeOptions(options, gistViewOptions);
  },

  // Show a new Gistbook
  onBeforeShow: function() {
    this.getRegion('gistbookContainer').show(this.createNewGistbook());

    this.getRegion('menuContainer').show(this.createMenu());
    this.registerMenuListeners();
  },

  registerMenuListeners: function() {
    this.listenTo(this.menu, 'save', this._sync);
    this.listenToOnce(this.menu, 'delete', this._delete);
  },

  // Syncs the 'nested' data structure with the parent
  _sync: function() {
    var sections = this.gistbookView.sections;
    this.gistbook.pages[0].sections = _.filter(sections.toJSON(), function(section) {
      return !/^\s*$/.test(section.source);
    });
    this.gistbook.title = this.gistbookModel.get('title');
    this._setGistbook();
    this._saveGist({newGist:false});
  },

  _delete: function() {
    this.model.destroy()
      .then(function() {
        routerChannel.command('navigate', Radio.request('user', 'user').get('login'));
      })
      .catch(function() {
        console.log('Unable to delete the gist');
      });
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
  _saveGist: function() {
    var attrs = {
      description: this.model.get('description'),
      files: this.model.get('files'),
      public: true
    };
    var isNew = this.isNew();
    var saveOptions = isNew ? undefined : {patch:true};
    this.model.save(attrs, saveOptions)
      .then(function(gistData) {
        if (isNew) {
          var username = gistData.owner ? gistData.owner.login : 'anonymous';
          var url = '/' + username + '/' + gistData.id;
          Radio.command('router', 'navigate', url);
        }
      })
      .catch(function() {
        console.log('Gist not saved', arguments);
      });
  },

  createMenu: function() {
    var menuOptions = {
      newGist: this.newGist,
      ownGistbook: this.ownGistbook
    };
    this.menu = new ExistingMenu(menuOptions);
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

