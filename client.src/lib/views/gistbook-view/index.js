/*
 * gistbookView
 * A LayoutView that renders the Gistbook.
 *
 */

var mn = require('marionette');
var Gistbook = require('../../entities/gistbook');
var templates = require('templates');

var GistbookView = mn.LayoutView.extend({
  gistbookOptions: ['gistbook'],

  template: templates.gistbookView,

  ui: {
    container: '.gistbook-container',
    header: '.gistbook-header',
    output: '.gistbook-output'
  },

  regions: {
    blocks: '.gistbook-container',
    header: '.gistbook-header',
    output: '.gistbook-output'
  },

  className: 'gistbook',

  // Create our collection from the gistbook's blocks
  initialize: function(options) {
    this.mergeOptions(options, this.gistbookOptions);

    // Instantiate our model as a Gistbook
    // this.model = new Gistbook(this.gistbook, {parse: true});

    // this.gistbookChannel = radioUtil.entityChannel(this.model);

    // this._createManagers();
  },

  // getBlocksView: function() {
  //   return new BlocksView({
  //     gistbookChannel: this.gistbookChannel,
  //     collection: this.model.get('blocks')
  //   });
  // },

  // onRender: function() {
  //   this.getRegion('blocks').show(this.getBlocksView());
  //   this.titleManager.showDisplayTitleView();
  //   this.outputManager.showRunView();
  // },

  // onBeforeDestroy: function() {
  //   this.titleManager.destroy();
  //   this.outputManager.destroy();

  //   delete this.collection;
  //   delete this.titleManager;
  //   delete this.outputManager;
  // },

  // Gistbooks have lots of managers. These are objects that have
  // specific tasks
  // _createManagers: function() {
  //   this.titleManager = new TitleManager({
  //     region: this.getRegion('header'),
  //     model: this.model
  //   });

  //   this.outputManager = new OutputManager({
  //     region: this.getRegion('output'),
  //     model: this.model,
  //     collection: this.model.get('blocks')
  //   });
  // }
});

module.exports = GistbookView;
