//
// displayWrapper
// This provides our edit menu when you're logged in
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import LayoutView from 'base/layout-view';

export default LayoutView.extend({
  template: 'displayWrapper',

  className: 'gistblock-menu',

  menuWrapperOptions: [
    'blockChannel',
    'editOptions'
  ],

  editOptions: {
    edit: true,
    delete: true,
    move: true
  },

  // Where to render the view
  regions: {
    content: '.gistblock-content'
  },

  // Where to put the view, and the 3 menu options
  ui: {
    content: '.gistblock-content',
    edit: '.gistblock-edit',
    move: '.gistblock-move',
    delete: '.gistblock-delete'
  },

  // Respond to clicks; the parent view is listening
  triggers: {
    'click @ui.edit': 'edit',
    'click @ui.move': 'move',
    'click @ui.delete': 'delete'
  },

  // Store our options on the object itself
  initialize(options) {
    mn.mergeOptions(this, options, this.menuWrapperOptions);
  },

  createDisplayView() {
    return this.blockChannel.request('displayView', this.model);
  },

  // Show the inert view after rendering
  onRender() {
    this._showMenu();
    var region = this.getRegion('content');
    this.displayView = this.createDisplayView();
    region.show(this.displayView);
  },

  // Show or hide each menu item based on options
  _showMenu() {
    _.each(this.editOptions, (val, key) => {
      this.ui[key].toggleClass('active-option', val);
    });
  }
});
