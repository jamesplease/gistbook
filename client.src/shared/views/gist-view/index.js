//
// GistView
// Displays a Github Gist that contains a Gistbook
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import githubApiHelpers from '../../../helpers/github-api-helpers';
import GistbookView from '../../../vendor/gistbook-view';
import Gist from '../../entities/gist';
import ExistingMenu from '../existing-menu';
import gistbookHelpers from '../../../helpers/gistbook-helpers';

var routerChannel = Radio.channel('router');

export default mn.LayoutView.extend({
  gistViewOptions: ['newGist', 'ownGistbook'],

  className: 'home',

  template: 'gistView',

  ui: {
    gistHeader: '.gist-header'
  },

  regions: {
    gistbookContainer: '.gistbook-container',
    menuContainer: '.gist-menu-container'
  },

  initialize: function(options) {
    this.mergeOptions(options, this.gistViewOptions);
  },

  // Show a new Gistbook
  onBeforeShow: function() {
    if (!Radio.request('auth', 'authorized') && !this.newGist) {
      this.ui.gistHeader.addClass('hide');
    }
    this.getRegion('gistbookContainer').show(this.createNewGistbook());

    this.getRegion('menuContainer').show(this.createMenu());
    this.registerMenuListeners();
  },

  registerMenuListeners: function() {
    this.listenTo(this.menu, {
      'click:save': this._sync,
      'click:fork': this._fork
    });
    this.listenToOnce(this.menu, 'click:delete', this._delete);
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

  _fork: function() {
    var baseUrl = githubApiHelpers.url + '/gists';
    var oldDescription = this.model.get('description');
    var self = this;

    // First, we fork the old Gist
    bb.$.post(baseUrl + '/' + this.model.get('id') + '/forks')

      // Now we need to update the Gist's description
      .then(function(resp) {
        return bb.$.ajax({
          type: 'PATCH',
          url: baseUrl + '/' + resp.id,
          data: JSON.stringify({description: oldDescription, files: {}})
        });
      })

      // Lastly, we redirect to the newly created fork
      .then(this._onForkComplete)
      .fail(function() {
        self.menu.trigger('error:fork');
      });
  },

  _onForkComplete: function(resp) {
    var currentUser = Radio.request('user', 'user').get('login');
    Radio.command('router', 'navigate', currentUser + '/' + resp.id);
  },

  _delete: function() {
    var self = this;
    this.model.destroy()
      .then(function() {
        self.menu.trigger('delete');
        routerChannel.command('navigate', Radio.request('user', 'user').get('login'));
      })
      .catch(function() {
        self.menu.trigger('error:delete');
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
    var self = this;
    this.model.save(attrs, saveOptions)
      .then(function(gistData) {
        self.menu.trigger('save');
        if (isNew) {
          var username = gistData.owner ? gistData.owner.login : 'anonymous';
          var url = '/' + username + '/' + gistData.id;
          Radio.command('router', 'navigate', url);
        }
      })
      .catch(function() {
        self.menu.trigger('error:save');
        console.log('Gist not saved', arguments);
      });
  },

  createMenu: function() {
    var menuOptions = {
      model: this.model,
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
    this.gistbook = !this.isNew() ? gistbookHelpers.gistbookFromGist(gist) : gistbookHelpers.newGistbook();
    return this.gistbook;
  },

  // Determine whether this is a new Gist or an existing one
  isNew: function() {
    return !this.model.get('id');
  }
});

