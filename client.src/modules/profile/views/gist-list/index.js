//
// GistList
//

import * as mn from 'marionette';
import GistbookListView from '../gistbook-list-view';

export default mn.CollectionView.extend({
  initialize(options) {
    this.model = options.model;
    this.isSelf = options.isSelf;
  },

  tagName: 'ul',

  childView: GistbookListView,

  childViewOptions() {
    return {
      user: this.model,
      isSelf: this.isSelf
    };
  },
});
