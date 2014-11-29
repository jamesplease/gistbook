//
// LoginView
// A view that displays our login button in the
// header
//

import * as bb from 'backbone';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: 'loginView',

  events: {
    'click a': 'onClickLogin'
  },

  // Save the current page in sessionStorage
  onClickLogin: function() {
    sessionStorage.setItem('cachedFragment', bb.history.fragment);
  }
});
