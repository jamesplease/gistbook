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

export default mn.LayoutView.extend({
  gistbookViewOptions: ['newGist', 'ownGistbook'],

  initialize(options) {
    mn.mergeOptions(this, options, this.gistbookViewOptions);
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

  onBeforeShow() {
    this.getRegion('sectionsContainer').show(this._createSectionsView());
    this.getRegion('output').show(new OutputView({
      sections: this.sections
    }));
    this._showDisplayTitle();
  },

  _showDisplayTitle() {
    // Remove listeners on the edit title view, if it exists
    var displayHeader = this._createDisplayHeaderView();
    this.getRegion('header').show(displayHeader);
    this.listenToOnce(displayHeader, 'edit', this._showEditTitle);
    this.titleView = displayHeader;
  },

  _showEditTitle() {
    var editTitleView = this._createEditHeaderView();
    this.getRegion('header').show(editTitleView);
    this.listenToOnce(editTitleView, 'save cancel', this._showDisplayTitle);
    this.titleView = editTitleView;
  },

  onBeforeDestroy() {
    this.pageChannel.reset();
    delete this.sections;
    delete this.titleView;
  },

  _createDisplayHeaderView() {
    return new DisplayTitleView({
      model: this.model,
      editable: this.ownGistbook
    });
  },

  _createEditHeaderView() {
    return new EditTitleView({
      model: this.model
    });
  },

  _createSectionsView() {
    this.pageChannel = radioHelpers.objChannel(this.model);
    return new SectionsView({
      collection: this._createSectionsCollection(),
      pageChannel: this.pageChannel,
      newGist: this.newGist,
      ownGistbook: this.ownGistbook
    });
  },

  _createSectionsCollection() {
    this.sections = new bb.Collection(this.model.get('pages')[0].sections);
    return this.sections;
  }
});
