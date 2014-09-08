var mn = require('marionette');

var GistbookListView = mn.ItemView.extend({
  initialize: function(options) {
    this.user = options.user;
  },

  className: 'gistbook-list-view',

  template: 'gistbookListView',

  events: {
    'click .octicon-trashcan': 'onDelete'
  },

  onDelete: function() {
    this.model.destroy();
  },

  templateHelpers: function() {
    return {
      username: this.user.escape('login')
    };
  }
});

module.exports = GistbookListView;
