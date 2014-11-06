//
// GistbookView
// A LayoutView that renders a Gistbook
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import SectionsView from './views/sections';
import OutputView from './views/output-view';
import DisplayTitleView from './views/title/display';
import EditTitleView from './views/title/edit';
import radioHelpers from './helpers/radio-helpers';

var gistbookViewOptions = ['newGist', 'ownGistbook'];

export default mn.LayoutView.extend({
  initialize: function(options) {
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
    this.pageChannel = radioHelpers.objChannel(this.model);
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
