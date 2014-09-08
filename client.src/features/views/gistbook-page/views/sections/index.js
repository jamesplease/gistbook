/*
 * Sections
 * A CollectionView that renders all of the Gistbook's sections
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var Radio = require('radio');
var DisplayTextView = require('../text/display');
var ControlsWrapper = require('../wrappers/controls-wrapper');
var AceEditorView = require('../ace-editor');
var stringUtil = require('../../../../../util/string-util');
var radioUtil = require('../../../../../util/radio-util');

var sectionsOptions = ['newGist', 'ownGistbook'];


module.exports = mn.CollectionView.extend({
  tagName: 'ul',

  initialize: function(options) {
    this.mergeOptions(options, sectionsOptions);
    this.pageChannel = options.pageChannel;
    this._renderedBefore = false;
  },

  // This is a magical method that determines which factory we should use
  // based on the type of the gistbook section and whether we're authorized
  // or not
  getChildView: function(model) {
    var factoryMethod = this._factoryMethodName(model.get('type'));
    return this[factoryMethod](model);
  },

  // Make it sortable if we're authorized
  onRender: function() {
    this._renderedBefore = true;
  },

  _factoryMethodName: function(viewType) {
    var style = this.ownGistbook || this.newGist ? 'Edit' : 'View';
    return '_create' + style + stringUtil.capitalize(viewType) + 'View';
  },

  _createEditTextView: function(model) {
    this._registerDisplayView(model, DisplayTextView);
    var initialMode = this.initialRender ? 'edit' : 'display';
    this.childViewOptions = {
      initialMode: initialMode
    };
    return ControlsWrapper;
  },

  _createEditJavascriptView: function(model) {
    var CustomAceEditor = AceEditorView.extend({
      className: 'ace-editor ace-editor-javascript'
    });
    this._registerDisplayView(model, CustomAceEditor);
    this.childViewOptions = {
      cache: false,
      editOptions: {
        edit: false,
        move: true,
        delete: true
      }
    };
    return ControlsWrapper;
  },

  _createEditHtmlView: function(model) {
    var CustomAceEditor = AceEditorView.extend({
      className: 'ace-editor ace-editor-html'
    });
    this._registerDisplayView(model, CustomAceEditor);
    this.childViewOptions = {
      cache: false,
      mode: 'html',
      editOptions: {
        edit: false,
        move: true,
        delete: true
      }
    };
    return ControlsWrapper;
  },

  _createEditCssView: function(model) {
    var CustomAceEditor = AceEditorView.extend({
      className: 'ace-editor ace-editor-css'
    });
    this._registerDisplayView(model, CustomAceEditor);
    this.childViewOptions = {
      cache: false,
      mode: 'css',
      editOptions: {
        edit: false,
        move: true,
        delete: true
      }
    };
    return ControlsWrapper;
  },

  // Register the DisplayView for a particular Gistblock on that block's Channel
  _registerDisplayView: function(model, ViewClass) {
    var self = this;
    radioUtil.objChannel(model).reply('displayView', function(model) {
      var options = _.extend({}, self.childViewOptions, {model:model});
      return new ViewClass(options);
    });
  }
});
