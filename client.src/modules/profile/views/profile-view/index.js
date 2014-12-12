//
// ProfileView
//

import * as mn from 'marionette';
import LayoutView from 'base/layout-view';
import NoGistsView from '../no-gists';
import GistList from '../gist-list';

export default LayoutView.extend({
  profileViewOptions: ['isSelf'],

  initialize(options) {
    mn.mergeOptions(this, options, this.profileViewOptions);
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

  onBeforeShow() {
    this.getRegion('gistsContainer').show(this.getChildView());
  },

  getChildView() {
    var childViewOptions = this.getChildViewOptions();
    var ChildView = this.noGists() ? NoGistsView : GistList;

    return new ChildView(childViewOptions);
  },

  getChildViewOptions() {
    return this.noGists() ? {
      model: this.model
    } : {
      model: this.model,
      collection: this.collection,
      isSelf: this.isSelf
    };
  },

  noGists() {
    return !this.collection.length;
  },
  
  templateHelpers() {
    return {
      gistbooks: this.collection,
      gistbooksLabel: this.collection.length === 1 ? 'Gistbook' : 'Gistbooks'
    };
  },

  configureEvents() {
    this.listenTo(this.collection, 'add remove reset', this.onCollectionChange);
  },

  onCollectionChange() {
    this.ui.$count.text(this.collection.length); 
  }
});
