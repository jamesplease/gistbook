/*
 * editWrapper
 * A wrapper for an editable View; it provides the controls to toggle
 * between source/preview, and the buttons to cancel/save the changes.
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var EditTextView = require('../../text/edit');

module.exports = mn.LayoutView.extend({
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
  initialize: function(options) {
    this.mergeOptions(options, this.editWrapperOptions);

    this.cache = this.model.toJSON();

    this.mode = 'write';
  },

  serializeData: function() {
    var data = mn.ItemView.prototype.serializeData.call(this);
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
  onPreview: function() {
    if (this.mode === 'preview') {
      return;
    }
    this._setCache();
    this.transitionUiToPreview();
    this.triggerMethod('updateCache');
    this.showPreview();
    this.mode = 'preview';
  },

  onWrite: function() {
    if (this.mode === 'write') {
      return;
    }
    this.transitionUiToCode();
    this.mode = 'write';
    this.showEditor();
  },

  // Update the cache when the user clicks update,
  // only if you're in code mode
  onUpdate: function() {
    if (this.mode === 'preview') {
      return;
    }
    this._setCache();
  },

  transitionUiToPreview: function() {
    this.ui.write.removeClass('active-tab');
    this.ui.preview.addClass('active-tab');
  },

  transitionUiToCode: function() {
    this.ui.preview.removeClass('active-tab');
    this.ui.write.addClass('active-tab');
  },

  getEditTextView: function() {
    return new EditTextView({
      model: this.model
    });
  },

  getPreviewView: function() {
    return this.blockChannel.request('displayView', this.model);
  },

  // Show the Ace Editor in our region; also set our cache
  showEditor: function() {
    var textEditorView = this.getEditTextView();
    var region = this.getRegion('content');
    region.show(textEditorView);
    this._setCache();
  },

  // The preview is just an inert math view
  showPreview: function() {
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
  onRender: function() {
    this._showMenu();
    this.showEditor();
  },

  // Set the cache from the value in the currentView
  _setCache: function() {
    var region = this.getRegion('content');
    this.cache = region.currentView.value();
  },

  // Show or hide each menu item based on options
  _showMenu: function() {
    _.each(this.editOptions, function(val, key) {
      this.ui[key].toggleClass('active-option', val);
    }, this);
  }
});
