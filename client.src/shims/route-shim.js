//
// Route
// An object that manages transitioning
// the app's state when a URI is matched
//

var mn = require('marionette');

function onFail(e) {
  if (!console || !console.assert) { return; }
  console.assert(false, e);
}

module.exports = mn.Route = mn.Object.extend({
  show: function() {},
  onFetchError: onFail,
  onShowError: onFail
});
