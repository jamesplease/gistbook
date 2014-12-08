//
// iframe
// The iFrame that renders the user's code.
//

import ItemView from 'base/item-view';

export default ItemView.extend({
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
