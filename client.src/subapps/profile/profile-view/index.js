/*
 * ProfileView
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var templates = require('templates');
var GistbookListView = require('../gistbook-list-view');

var ProfileView = mn.CompositeView.extend({
  className: 'profile-view',

  template: templates.profileView,

  childView: GistbookListView,

  childViewOptions: function() {
    return {
      user: this.model
    };
  },
  
  childViewContainer: '.profile-list ul',

  templateHelpers: function() {
    var self = this;
    return {
      gistbooks: this.collection,
      gistbookText: function() {
        return self.collection.length === 1 ? 'Gistbook' : 'Gistbooks'; 
      }
    };
  }
});

module.exports = ProfileView;
