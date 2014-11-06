//
// NewRoute
// The /new route is where we make a Gistbook. Because
// that's done on the homepage, we just redirect people
// over there.
//

import Route from '../../lib/routing/route';

export default Route.extend({
  redirect: ''
});
