//
// compileView
// Manages compiling a Gistbook Page
//

import * as mn from 'marionette';
import CodeManager from '../../managers/code-manager';
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
    compile: 'button'
  },

  events: {
    'click @ui.compile': 'onCompile'
  },

  onCompile: function() {
    var code = this.codeManager.getCode();
    this.compiler.compile(code);
  },

  configureListeners: function() {
    this.listenTo(this.compiler, 'compile', this.showCompiledView);
    this.listenTo(this.compiler, 'compile:error', this.showErrorView);
  },

  showCompiledView: function(iFrameView) {
    this.getRegion('output').show(iFrameView);
  },

  showErrorView: function() {
    this.getRegion('output').show(new ErrorView());
  },

  createManagers: function() {
    this.codeManager = new CodeManager({
      sections: this.sections
    });

    this.compiler = new Compiler();
  }
});
