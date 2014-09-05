/*
 * compileView
 * Manages compiling a Gistbook Page
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var templates = require('templates');
var CodeManager = require('../../managers/code-manager');
var Compiler = require('../../managers/compiler');

module.exports = mn.LayoutView.extend({
  initialize: function(options) {
    _.bindAll(this, 'showCompiledView');

    this.pages = options.pages;
    this.createManagers();
    this.configureListeners();
  },

  regions: {
    output: '.gistbook-output-container'
  },

  template: templates.outputView,

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
  },

  showCompiledView: function(iFrameView) {
    this.getRegion('output').show(iFrameView);
  },

  createManagers: function() {
    this.codeManager = new CodeManager({
      pages: this.pages
    });

    this.compiler = new Compiler();
  }
});
