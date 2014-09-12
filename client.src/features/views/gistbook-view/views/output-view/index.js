/*
 * compileView
 * Manages compiling a Gistbook Page
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var CodeManager = require('../../managers/code-manager');
var Compiler = require('../../managers/compiler');
var ErrorView = require('./compile-error-view');

module.exports = mn.LayoutView.extend({
  initialize: function(options) {
    _.bindAll(this, 'showCompiledView');

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
