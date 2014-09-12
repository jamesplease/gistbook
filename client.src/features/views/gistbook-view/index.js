/*
 * GistbookView
 * A LayoutView that renders a Gistbook
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');
var SectionsView = require('./views/sections');
var OutputView = require('./views/output-view');
var DisplayTitleView = require('./views/title/display');
var EditTitleView = require('./views/title/edit');
var radioUtil = require('../../../util/radio-util');

var gistbookViewOptions = ['newGist', 'ownGistbook'];

module.exports = mn.LayoutView.extend({
  initialize: function(options) {
    _.bindAll(this, '_showDisplayTitle', '_showEditTitle');
    this.mergeOptions(options, gistbookViewOptions);
  },

  template: 'gistbookView',

  ui: {
    container: '.gistbook-container',
    header: '.gistbook-header',
    output: '.gistbook-output'
  },

  regions: {
    sectionsContainer: '.gistbook-body',
    header: '.gistbook-header',
    output: '.gistbook-output'
  },

  className: 'gistbook',

  onBeforeShow: function() {
    this.getRegion('sectionsContainer').show(this._createSectionsView());
    this.getRegion('output').show(new OutputView({
      sections: this.sections
    }));
    this._showDisplayTitle();
  },

  _showDisplayTitle: function() {
    // Remove listeners on the edit title view, if it exists
    var displayHeader = this._createDisplayHeaderView();
    this.getRegion('header').show(displayHeader);
    this.listenToOnce(displayHeader, 'edit', this._showEditTitle);
    this.titleView = displayHeader;
  },

  _showEditTitle: function() {
    var editTitleView = this._createEditHeaderView();
    this.getRegion('header').show(editTitleView);
    this.listenToOnce(editTitleView, 'save cancel', this._showDisplayTitle);
    this.titleView = editTitleView;
  },

  onBeforeDestroy: function() {
    this.pageChannel.reset();
    delete this.sections;
    delete this.titleView;
  },

  _createDisplayHeaderView: function() {
    return new DisplayTitleView({
      model: this.model,
      editable: this.ownGistbook
    });
  },

  _createEditHeaderView: function() {
    return new EditTitleView({
      model: this.model
    });
  },

  _createSectionsView: function() {
    this.pageChannel = radioUtil.objChannel(this.model);
    return new SectionsView({
      collection: this._createSectionsCollection(),
      pageChannel: this.pageChannel,
      newGist: this.newGist,
      ownGistbook: this.ownGistbook
    });
  },

  _createSectionsCollection: function() {
    this.sections = new bb.Collection(this.model.get('pages')[0].sections);
    return this.sections;
  }
});
