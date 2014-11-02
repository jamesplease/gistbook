//
// NewRoute
// The /new route is where we make a Gistbook. Because
// that's done on the homepage, we just redirect people
// over there.
//

import * as mn from 'marionette';

export default mn.Route.extend({
  redirect: ''
});
