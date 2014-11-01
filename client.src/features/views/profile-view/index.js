//
// ProfileView
//

var _ = require('underscore');
var mn = require('marionette');
var GistbookListView = require('./views/gistbook-list-view');
var NoGistsView = require('./views/no-gists');
var GistList = require('./views/gist-list');

var ProfileView = mn.LayoutView.extend({
  initialize: function() {
    this.configureEvents();
  },

  className: 'profile-view',

  template: 'profileView',

  ui: {
    $count: '.gistbook-count > span'
  },

  regions: {
    gistsContainer: '.boxed-group-body'
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
  },

  configureEvents: function() {
    this.listenTo(this.collection, 'add remove reset', this.onCollectionChange);
  },

  onCollectionChange: function() {
    this.ui.$count.text(this.collection.length); 
  }
});

module.exports = ProfileView;
