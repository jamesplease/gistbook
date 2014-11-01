//
// iframe
// The iFrame that renders the user's code.
//

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  tagName: 'iframe',

  template: false,

  attributes: {
    sandbox: 'allow-scripts allow-popups allow-pointer-lock'
  },

  onRender: function() {
    this.$el.attr('src', this._generateSrc());
  },

  _generateSrc: function() {
    return '/output/' + this.model.get('token');
  },

  className: 'gistbook-iframe'
});
