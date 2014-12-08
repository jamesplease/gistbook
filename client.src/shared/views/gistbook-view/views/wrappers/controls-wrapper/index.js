//
// controlsWrapper
// If the user is logged in, then this wraps every view. 
// It also manages shared cached data between the Display
// and Edit modes.
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import LayoutView from 'base/layout-view';
import DisplayWrapper from '../display-wrapper';
import EditWrapper from '../edit-wrapper';
import radioHelpers from '../../../helpers/radio-helpers';

var overlayChannel = Radio.channel('overlay');

export default LayoutView.extend({
  template: 'controlsWrapper',

  className: 'controls-wrapper-view',

  tagName: 'li',

  initialMode: 'display',

  editOptions: {
    edit: true,
    delete: true,
    move: true
  },

  controlsWrapperOptions: [
    'cache',
    'editOptions',
    'initialMode',
    'gistbookChannel'
  ],

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  ui: {
    addRow: '.gistbook-add-row',
    addSectionMenu: '.add-section-menu',
    addText: '.gistbook-add-text',
    addJavascript: '.gistbook-add-js',
    addCss: '.gistbook-add-css',
    addHtml: '.gistbook-add-html'
  },

  triggers: {
    'click @ui.addRow': 'click:add:row',
    'click @ui.addText': 'add:text',
    'click @ui.addHtml': 'add:html',
    'click @ui.addCss': 'add:css',
    'click @ui.addJavascript': 'add:javascript'
  },

  // Sets our options, binds callback context, and creates
  // a cached model for users to mess around with
  initialize(options) {
    this.gistSections = this.model.collection;
    mn.mergeOptions(this, options, this.controlsWrapperOptions);
    this._createCache();
  },

  hideAddOptions() {
    this.ui.addRow.removeClass('active');
    overlayChannel.command('hide');
    this.ui.addSectionMenu.removeClass('visible');
  },

  onClickAddRow() {
    this.ui.addRow.addClass('active');
    this.listenToOnce(overlayChannel, 'click', this.hideAddOptions);
    overlayChannel.command('show');
    this.ui.addSectionMenu.addClass('visible');
  },

  onEdit() {
    this.showActive();
  },

  // Refactor to use the channel
  onDelete() {
    this.model.collection.remove(this.model);
  },

  // When the user cancels editing, first reset the cache to match
  // the saved state. Then, show the preview
  onCancel() {
    this._resetCache();
    this.showDisplay();
  },

  onAddText() {
    this._addSection('text');
  },

  onAddHtml() {
    this._addSection('html');
  },

  onAddCss() {
    this._addSection('css');
  },

  onAddJavascript() {
    this._addSection('javascript');
  },

  _addSection(type) {
    var index = this.gistSections.indexOf(this.model);
    var newSection = this._createNewSection(type);
    this.gistSections.add(newSection, {at: index});
    this.hideAddOptions();
  },

  showDisplay() {
    if (this.currentView) { this.stopListening(this.currentView); }
    var displayWrapper = this.getDisplayWrapper();
    this.getRegion('wrapper').show(displayWrapper);
    this.currentView = displayWrapper;
    this._configurePreviewListeners();
  },

  showActive() {
    if (this.currentView) { this.stopListening(this.currentView); }
    var editWrapper = this.getEditWrapper();
    this.getRegion('wrapper').show(editWrapper);
    this.currentView = editWrapper;
    this._configureEditListeners();
  },

  // When the user updates, first update the cache with the value
  // from the AceEditor. Then persist those changes to the actual model.
  // Finally, take them to the preview view.
  onUpdate() {
    this._updateCache();
    this._saveCache();
    this.showDisplay();
  },

  // Determine which view to show
  onRender() {
    if (this.initialMode === 'edit') {
      this.showActive();
    } else {
      this.showDisplay();
    }
  },

  getDisplayWrapper() {
    return new DisplayWrapper({
      mode: this.mode,
      editOptions: this.editOptions,
      model: this.getModel(),
      blockChannel: radioHelpers.objChannel(this.model)
    });
  },

  getModel() {
    var model;
    if (this.cache) {
      this.cachedModel = model = new bb.Model(
        this.model.toJSON()
      );
    } else {
      model = this.model;
    }
    return model;
  },

  getEditWrapper() {
    return new EditWrapper({
      model: this.cachedModel,
      blockChannel: radioHelpers.objChannel(this.model)
    });
  },

  // Store a cached model on the view. The user can manipulate
  // this all they want. If they save the block we will persist
  // it to the model
  _createCache() {
    this.cachedModel = new bb.Model(
      this.model.toJSON()
    );
  },

  // Call this when the user hits update and wants to save
  // their changes to the model
  _saveCache() {
    this.model.set(this.cachedModel.toJSON());
  },

  // If the user changes the cache and wants to reset it,
  // call this
  _resetCache() {
    this.cachedModel.set(this.model.toJSON());
  },

  _createNewSection(type) {
    return new bb.Model({
      type: type,
      source: ''
    });
  },

  // Update the cache with the latest content of the text editor. Only
  // makes sense to be called when the currentView is the cache
  _updateCache() {
    var cachedSource = this.getRegion('wrapper').currentView.cache;
    this.cachedModel.set('source', cachedSource);
  },

  _configureEditListeners() {
    this.listenTo(this.currentView, {
      cancel: this.onCancel,
      update: this.onUpdate,
      updateCache: this._updateCache
    });
  },

  _configurePreviewListeners() {
    this.listenTo(this.currentView, {
      edit: this.onEdit,
      delete: this.onDelete
    });
  }
});
