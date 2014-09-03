/*
 * ProfileView
 *
 */

var _ = require('underscore');
var mn = require('marionette');
var templates = require('templates');
var GistbookListView = require('../gistbook-list-view');
var NoGistsView = require('../no-gists');
var GistList = require('../gist-list');

var ProfileView = mn.LayoutView.extend({
  className: 'profile-view',

  template: templates.profileView,

  regions: {
    gistsContainer: '.gists-container'
  },

  onBeforeShow: function() {
    this.getRegion('gistsContainer').show(this.getChildView());
  },

  getChildView: function() {
    var childViewOptions = this.getChildViewOptions();
    var ChildView = this.noGists() ? NoGistsView : GistList;

    return new ChildView(childViewOptions);
  },

  getChildViewOptions: function() {
    return this.noGists() ? {
      model: this.model
    } : {
      model: this.model,
      collection: this.collection
    };
  },

  noGists: function() {
    return !this.collection.length;
  },
  
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
