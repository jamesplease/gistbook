var mn = require('marionette');
var templates = require('templates');

var GistbookListView = mn.ItemView.extend({
  initialize: function(options) {
    this.user = options.user;
  },

  template: templates.gistbookListView,

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
