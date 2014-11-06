//
// Route
// An object that manages transitioning
// the app's state when a URI is matched
//

import * as mn from 'marionette';

function onFail(e) {
  if (!console || !console.assert) { return; }
  console.assert(false, e);
}

export default mn.Object.extend({
  show: function() {},
  onFetchError: onFail,
  onShowError: onFail
});
