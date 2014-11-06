//
// GistList
//

import * as mn from 'marionette';
import GistbookListView from '../gistbook-list-view';

export default mn.CollectionView.extend({
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
