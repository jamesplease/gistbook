//
// NewRoute
// The /new route is where we make a Gistbook. Because
// that's done on the homepage, we just redirect people
// over there.
//

var mn = require('marionette');

module.exports = mn.Route.extend({
  redirect: ''
});
