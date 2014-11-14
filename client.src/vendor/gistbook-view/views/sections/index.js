//
// Sections
// A CollectionView that renders all of the Gistbook's sections
//

import * as Sortable from 'sortable';
import * as _ from 'underscore';
import * as mn from 'marionette';
import * as Radio from 'radio';
import DisplayTextView from '../text/display';
import ControlsWrapper from '../wrappers/controls-wrapper';
import AceEditorView from '../ace-editor-view';
import stringHelpers from '../../helpers/string-helpers';
import radioHelpers from '../../helpers/radio-helpers';

var aceChannel = Radio.channel('ace');

export default mn.CollectionView.extend({
  sectionsOptions: ['newGist', 'ownGistbook'],

  tagName: 'ul',

  initialize: function(options) {
    this.mergeOptions(options, this.sectionsOptions);
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

  onAttach: function() {
    var self = this;
    this._sortable = new Sortable(this.el, {
      setData: false,
      handle: '.gistblock-move',
      draggable: '.controls-wrapper-view',
      ghostClass: 'gistblock-placeholder',
      onStart: function() {
        aceChannel.trigger('dragStart');
      },
      onEnd: function() {
        aceChannel.trigger('dragEnd');
        self._resortByDom();
      }
    });
  },

  // Silently update the collection based on the new DOM indices
  _resortByDom: function() {
    var newCollection = {};
    var newArray = [];
    var index, $children = this.$el.children();

    this.children.each(function(view, i) {
      index = $children.index(view.el);
      newCollection[index] = view.model;
      newArray = _.sortBy(newCollection, function(key, i) {
        return i;
      });
      view._index = index;
    }, this);
    
    this.collection.reset(newArray, {silent: true});
  },

  // Make it sortable if we're authorized
  onRender: function() {
    this.$el.addClass('gistbook-'+this._style().toLowerCase());
    this._renderedBefore = true;
  },

  _style: function() {
    return this.ownGistbook || this.newGist ? 'Edit' : 'Display';
  },

  _factoryMethodName: function(viewType) {
    var style = this._style();
    return '_create' + style + stringHelpers.capitalize(viewType) + 'View';
  },

  _createEditTextView: function(model) {
    this._registerDisplayView(model, DisplayTextView);
    var initialMode = this.initialRender ? 'edit' : 'display';
    this.childViewOptions = {
      initialMode: initialMode
    };
    return ControlsWrapper;
  },

  _createDisplayTextView: function(model) {
    this.childViewOptions = {};
    return DisplayTextView.extend({
      tagName: 'li',
      className: 'gistblock gistblock-text gistbook-section-display'
    });
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

  _createDisplayJavascriptView: function(model) {
    this.childViewOptions = {
      readOnly: true,
      hideCursor: true,
    };
    return AceEditorView.extend({
      className: 'ace-editor ace-editor-javascript gistbook-section-display',
      tagName: 'li'
    });
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

  _createDisplayHtmlView: function(model) {
    this.childViewOptions = {
      readOnly: true,
      hideCursor: true,
      mode: 'html'
    };
    return AceEditorView.extend({
      className: 'ace-editor ace-editor-html gistbook-section-display',
      tagName: 'li'
    });
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

  _createDisplayCssView: function(model) {
    this.childViewOptions = {
      readOnly: true,
      hideCursor: true,
      mode: 'css'
    };
    return AceEditorView.extend({
      className: 'ace-editor ace-editor-css gistbook-section-display',
      tagName: 'li'
    });
  },

  // Register the DisplayView for a particular Gistblock on that block's Channel
  _registerDisplayView: function(model, ViewClass) {
    var self = this;
    radioHelpers.objChannel(model).reply('displayView', function(model) {
      var options = _.extend({}, self.childViewOptions, {model:model});
      return new ViewClass(options);
    });
  }
});
