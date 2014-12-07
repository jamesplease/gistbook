//
// iframe
// The iFrame that renders the user's code.
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
  tagName: 'iframe',

  template: false,

  attributes: {
    sandbox: 'allow-scripts allow-popups allow-pointer-lock'
  },

  onRender() {
    this.$el.attr('src', this._generateSrc());
  },

  _generateSrc() {
    return '/output/' + this.model.get('token');
  },

  className: 'gistbook-iframe'
});
