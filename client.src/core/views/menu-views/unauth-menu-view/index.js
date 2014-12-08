//
// LoginView
// A view that displays our login button in the
// header
//

import * as bb from 'backbone';
import ItemView from 'base/item-view';

export default ItemView.extend({
  template: 'loginView',

  events: {
    'click a': 'onClickLogin'
  },

  // Save the current page in sessionStorage
  onClickLogin() {
    if (!bb.history.fragment) { return; }
    sessionStorage.setItem('cachedFragment', bb.history.fragment);
  }
});
