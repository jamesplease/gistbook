/*
 * gistbookPageView
 * A LayoutView that renders a single Gistbook page
 *
 */

var bb = require('backbone');
var mn = require('marionette');
var SectionsView = require('./views/sections');
var OutputView = require('./views/output-view');
var templates = require('templates');
var radioUtil = require('../../util/radio-util');

module.exports = mn.LayoutView.extend({
  template: templates.gistbookPage,

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
      pages: this.pages
    }));
  },

  onBeforeDestroy: function() {
    this.pageChannel.reset();
  },

  _createSectionsView: function() {
    this.pageChannel = radioUtil.objChannel(this.model);
    return new SectionsView({
      collection: this._createSectionsCollection(),
      pageChannel: this.pageChannel
    });
  },

  _createSectionsCollection: function() {
    this.pages = new bb.Collection(this.model.get('sections'));
    return this.pages;
  }
});
