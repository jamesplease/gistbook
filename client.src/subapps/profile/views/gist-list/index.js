/*
 * GistList
 *
 */

var mn = require('marionette');
var GistbookListView = require('../gistbook-list-view');

module.exports = mn.CollectionView.extend({
  initialize: function(options) {
    this.model = options.model;
  },

  tagName: 'ul',

  childView: GistbookListView,

  childViewOptions: function() {
    return {
      user: this.model
    };
  },
});
