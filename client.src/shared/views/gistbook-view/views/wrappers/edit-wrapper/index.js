//
// editWrapper
// A wrapper for an editable View; it provides the controls to toggle
// between source/preview, and the buttons to cancel/save the changes.
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import LayoutView from 'base/layout-view';
import EditTextView from '../../text/edit';

export default LayoutView.extend({
  template: 'editWrapper',

  className: 'gistblock-editor',

  tagName: 'li',

  // Default values for options
  defaults: {
    // What the tab says that shows the source
    sourceTabText: 'Write',
    PreviewView: undefined,
    blockChannel: undefined
  },

  sourceTabText: 'Write',

  editWrapperOptions: [
    'sourceTabText',
    'PreviewView',
    'blockChannel'
  ],

  // Store our options on the object itself.
  // Also set the initial mode to be code.
  initialize(options) {
    mn.mergeOptions(this, options, this.editWrapperOptions);
    this.cache = this.model.toJSON();
    this.mode = 'write';
  },

  serializeData() {
    var data = LayoutView.prototype.serializeData.call(this);
    data.sourceTabText = this.sourceTabText;
    return data;
  },

  // Where to put the view, and the 3 menu options
  ui: {
    content: '.gistblock-content',
    write:   '.gistblock-write',
    preview: '.gistblock-preview',
    cancel:  '.gistblock-cancel',
    update:  '.gistblock-update'
  },

  // Respond to clicks; the parent view is listening
  triggers: {
    'click @ui.write':   'write',
    'click @ui.preview': 'preview',
    'click @ui.cancel':  'cancel',
    'click @ui.update':  'update'
  },

  // On preview, update the cache with the changes in the Ace Editor
  // Then, show the preview state
  onPreview() {
    if (this.mode === 'preview') {
      return;
    }
    this._setCache();
    this.transitionUiToPreview();
    this.triggerMethod('updateCache');
    this.showPreview();
    this.mode = 'preview';
  },

  onWrite() {
    if (this.mode === 'write') {
      return;
    }
    this.transitionUiToCode();
    this.mode = 'write';
    this.showEditor();
  },

  // Update the cache when the user clicks update,
  // only if you're in code mode
  onUpdate() {
    if (this.mode === 'preview') {
      return;
    }
    this._setCache();
  },

  transitionUiToPreview() {
    this.ui.write.removeClass('active-tab');
    this.ui.preview.addClass('active-tab');
  },

  transitionUiToCode() {
    this.ui.preview.removeClass('active-tab');
    this.ui.write.addClass('active-tab');
  },

  getEditTextView() {
    return new EditTextView({
      model: this.model
    });
  },

  getPreviewView() {
    return this.blockChannel.request('displayView', this.model);
  },

  // Show the Ace Editor in our region; also set our cache
  showEditor() {
    var textEditorView = this.getEditTextView();
    var region = this.getRegion('content');
    region.show(textEditorView);
    this._setCache();
  },

  // The preview is just an inert math view
  showPreview() {
    this._setCache();
    var region = this.getRegion('content');
    var previewView = this.getPreviewView();
    region.show(previewView);
  },

  // Where to render the inert view
  regions: {
    content: '.gistblock-content'
  },

  // Show the editor view on the first render
  onRender() {
    this._showMenu();
    this.showEditor();
  },

  // Set the cache from the value in the currentView
  _setCache() {
    var region = this.getRegion('content');
    this.cache = region.currentView.value();
  },

  // Show or hide each menu item based on options
  _showMenu() {
    _.each(this.editOptions, (val, key) => {
      this.ui[key].toggleClass('active-option', val);
    });
  }
});
