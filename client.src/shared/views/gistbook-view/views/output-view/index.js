//
// compileView
// Manages compiling a Gistbook Page
//

import LayoutView from 'base/layout-view';
import * as Spinner from 'spin.js';
import CodeExtractor from './services/code-extractor';
import moduleBundler from './services/module-bundler';
import Compiler from './services/compiler';
import ErrorView from './views/compile-error-view';

export default LayoutView.extend({
  initialize(options) {
    this.sections = options.sections;
    this.createManagers();
    this.configureListeners();
  },

  regions: {
    output: '.gistbook-output-container'
  },

  template: 'outputView',

  className: 'gistbook-compile-view',

  ui: {
    compile: 'button',
    spinnerContainer: '.spinner-container'
  },

  events: {
    'click @ui.compile': 'onClickCompile'
  },

  spinnerOptions: {
    color: '#777',
    lines: 7,
    length: 3,
    width: 3,
    radius: 4
  },

  configureListeners() {
    this.listenTo(this.compiler, {
      compile: this.showCompiledView,
      'error:compile': this.showErrorView
    });
  },

  onClickCompile() {
    this._compiling = true;
    this.ui.compile.prop('disabled', true);
    this._showSpinner();
    var code = this.codeExtractor.getCode();
    this.listenToOnce(moduleBundler, 'retrieve', js => {
      code.javascript = js;
      this.compiler.compile(code);
    });
    moduleBundler.getBundle(code.javascript);
  },

  _showSpinner() {
    if (!this._compiling) { return; }
    this.ui.spinnerContainer.addClass('show');
  },

  _resetBtn() {
    this.ui.compile.prop('disabled', false);
    this.ui.spinnerContainer.removeClass('show');
  },

  onRender() {
    new Spinner(this.spinnerOptions).spin(this.ui.spinnerContainer[0]);
  },

  showCompiledView(iFrameView) {
    this._compiling = false;
    this._resetBtn();
    this.getRegion('output').show(iFrameView);
  },

  showErrorView() {
    this._compiling = false;
    this._resetBtn();
    this.getRegion('output').show(new ErrorView());
  },

  createManagers() {
    this.codeExtractor = new CodeExtractor({
      sections: this.sections
    });

    this.compiler = new Compiler();
  }
});
