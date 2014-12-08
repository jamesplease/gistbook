//
// Sections
// A CollectionView that renders all of the Gistbook's sections
//

import * as Sortable from 'sortable';
import * as _ from 'underscore';
import * as mn from 'marionette';
import * as Radio from 'radio';
import CollectionView from 'base/collection-view';
import DisplayTextView from '../text/display';
import ControlsWrapper from '../wrappers/controls-wrapper';
import AceEditorView from '../ace-editor-view';
import stringHelpers from '../../helpers/string-helpers';
import radioHelpers from '../../helpers/radio-helpers';

var aceChannel = Radio.channel('ace');

export default CollectionView.extend({
  sectionsOptions: ['newGist', 'ownGistbook'],

  tagName: 'ul',

  initialize(options) {
    mn.mergeOptions(this, options, this.sectionsOptions);
    this.pageChannel = options.pageChannel;
    this._renderedBefore = false;
  },

  // This is a magical method that determines which factory we should use
  // based on the type of the gistbook section and whether we're authorized
  // or not
  getChildView(model) {
    var factoryMethod = this._factoryMethodName(model.get('type'));
    return this[factoryMethod](model);
  },

  onAttach() {
    var self = this;
    this._sortable = new Sortable(this.el, {
      setData: false,
      handle: '.gistblock-move',
      draggable: '.controls-wrapper-view',
      ghostClass: 'gistblock-placeholder',
      onStart() {
        aceChannel.trigger('dragStart');
      },
      onEnd() {
        aceChannel.trigger('dragEnd');
        self._resortByDom();
      }
    });
  },

  // Silently update the collection based on the new DOM indices
  _resortByDom() {
    var newCollection = {};
    var newArray = [];
    var index, $children = this.$el.children();

    this.children.each((view, i) => {
      index = $children.index(view.el);
      newCollection[index] = view.model;
      newArray = _.sortBy(newCollection, (key, i) => {
        return i;
      });
      view._index = index;
    }, this);
    
    this.collection.reset(newArray, {silent: true});
  },

  // Make it sortable if we're authorized
  onRender() {
    this.$el.addClass('gistbook-'+this._style().toLowerCase());
    this._renderedBefore = true;
  },

  _style() {
    return this.ownGistbook || this.newGist ? 'Edit' : 'Display';
  },

  _factoryMethodName(viewType) {
    var style = this._style();
    return '_create' + style + stringHelpers.capitalize(viewType) + 'View';
  },

  _createEditTextView(model) {
    this._registerDisplayView(model, DisplayTextView);
    var initialMode = this.initialRender ? 'edit' : 'display';
    this.childViewOptions = {
      initialMode: initialMode
    };
    return ControlsWrapper;
  },

  _createDisplayTextView(model) {
    this.childViewOptions = {};
    return DisplayTextView.extend({
      tagName: 'li',
      className: 'gistblock gistblock-text gistbook-section-display'
    });
  },

  _createEditJavascriptView(model) {
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

  _createDisplayJavascriptView(model) {
    this.childViewOptions = {
      readOnly: true,
      hideCursor: true,
    };
    return AceEditorView.extend({
      className: 'ace-editor ace-editor-javascript gistbook-section-display',
      tagName: 'li'
    });
  },

  _createEditHtmlView(model) {
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

  _createDisplayHtmlView(model) {
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

  _createEditCssView(model) {
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

  _createDisplayCssView(model) {
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
  _registerDisplayView(model, ViewClass) {
    radioHelpers.objChannel(model).reply('displayView', model => {
      var options = _.extend({}, this.childViewOptions, {model:model});
      return new ViewClass(options);
    });
  }
});
