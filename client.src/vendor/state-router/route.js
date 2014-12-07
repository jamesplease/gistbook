//
// Route
// An object that manages transitioning
// the app's state when a URI is matched
//

import * as mn from 'marionette';

export default mn.Object.extend({
  show() {},
  onError(e) {
    if (!console || !console.assert) { return; }
    console.assert(false, e);
  }
});
