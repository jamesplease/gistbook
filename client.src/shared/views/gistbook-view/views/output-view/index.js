//
// compileView
// Manages compiling a Gistbook Page
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import * as Spinner from 'spin.js';
import CodeManager from '../../managers/code-manager';
import moduleBundler from '../../managers/module-bundler';
import Compiler from '../../managers/compiler';
import ErrorView from './compile-error-view';

export default mn.LayoutView.extend({
  initialize: function(options) {
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

  configureListeners: function() {
    this.listenTo(this.compiler, {
      compile: this.showCompiledView,
      'error:compile': this.showErrorView
    });
  },

  onClickCompile: function() {
    this._compiling = true;
    this.ui.compile.prop('disabled', true);
    _.delay(_.bind(this._showSpinner, this), 250);
    var code = this.codeManager.getCode();
    var self = this;
    this.listenToOnce(moduleBundler, 'retrieve', function(js) {
      code.javascript = js;
      self.compiler.compile(code);
    });
    moduleBundler.getBundle(code.javascript);
  },

  _showSpinner: function() {
    if (!this._compiling) { return; }
    this.ui.spinnerContainer.addClass('show');
  },

  _resetBtn: function() {
    this.ui.compile.prop('disabled', false);
    this.ui.spinnerContainer.removeClass('show');
  },

  onRender: function() {
    new Spinner(this.spinnerOptions).spin(this.ui.spinnerContainer[0]);
  },

  showCompiledView: function(iFrameView) {
    this._compiling = false;
    this._resetBtn();
    this.getRegion('output').show(iFrameView);
  },

  showErrorView: function() {
    this._compiling = false;
    this._resetBtn();
    this.getRegion('output').show(new ErrorView());
  },

  createManagers: function() {
    this.codeManager = new CodeManager({
      sections: this.sections
    });

    this.compiler = new Compiler();
  }
});
