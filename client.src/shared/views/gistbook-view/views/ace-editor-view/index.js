/* jshint maxstatements: 20 */

//
// aceEditor
// A view for the ace editor, which is used
// when editing code
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import ItemView from 'base/item-view';

var aceChannel = Radio.channel('ace');
 
export default ItemView.extend({
  template: 'aceEditorView',

  // Defaults for the Ace Editor
  readOnly: false,
  tabSize: 2,
  softTabs: true,
  highlightActiveLine: false,
  theme: 'tomorrow',
  mode: 'javascript',
  minLines: 5,
  maxLines: 20,
  hideCursor: false,
  showGutter: false,

  aceEditorViewOptions: [
    'readOnly',
    'tabSize',
    'softTabs',
    'highlightActiveLine',
    'theme',
    'mode',
    'minLines',
    'maxLines',
    'hideCursor',
    'showGutter'
  ],

  ui: {
    aceContainer: '.ace-editor'
  },

  events: {
    'focusout': 'onBlur',
    'keypress': 'onKeypress',
  },

  onBlur() {
    this.update();
  },

  onKeypress(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code !== 13 || !e.shiftKey) {
      return;
    }
    e.preventDefault();
    this.editor.blur();
  },

  value() {
    return this.editor.getSession().getValue();
  },

  update() {
    this.model.set('source', this.value());
  },

  // Merge the options
  initialize(options) {
    mn.mergeOptions(this, options, this.aceEditorViewOptions);
    this.listenTo(aceChannel, {
      dragStart: this._onDragStart,
      dragEnd: this._onDragEnd
    });
  },

  // These two methods are here because the $fontMetrics element
  // is absolutely positioned, which shifts the ghost image
  // that appears during drag and drop interface. Ideally this
  // won't always be the case. Related issue: ace#2240
  // https://github.com/ajaxorg/ace/issues/2240
  _onDragStart() {
    this.editor.renderer.$fontMetrics.el.style.display = 'none';
  },
  _onDragEnd() {
    this.editor.renderer.$fontMetrics.el.style.display = 'block';
  },

  // Create the editor and configure it
  onRender() {
    this.editor = ace.edit(this.ui.aceContainer[0]);
    this._configureEditor();
    if (this.readOnly) {
      this.$el.addClass('read-only');
    }
  },

  // Clean up the editor before we close the view down
  onBeforeDestroy() {
    this.editor.destroy();
  },

  // Configure the editor based on our options
  _configureEditor() {
    var themePath = this._getThemePath(this.theme);
    var modePath  = this._getModePath(this.mode);

    var session = this.editor.getSession();
    var renderer = this.editor.renderer;

    this.editor.setHighlightActiveLine(this.highlightActiveLine);
    this.editor.getSession().setMode(modePath);
    this.editor.setTheme(themePath);
    this.editor.setShowPrintMargin(false);
    this.editor.setOption('maxLines', this.maxLines);
    this.editor.setOption('minLines', this.minLines);

    this.editor.setReadOnly(this.readOnly);
    session.setTabSize(this.tabSize);
    session.setUseSoftTabs(this.softTabs);
    renderer.setShowGutter(this.showGutter);

    if (this.hideCursor) {
      renderer.$cursorLayer.element.style.opacity = 0;
    }
  },

  // Where ace stores its themes
  _getThemePath(themeName) {
    return 'ace/theme/' + themeName;
  },

  // Where ace stores modes
  _getModePath(modeName) {
    return 'ace/mode/' + modeName;
  }
});
