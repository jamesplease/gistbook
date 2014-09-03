/*
 * NewRoute
 * The /new route is where we make a Gistbook. Because
 * that's done on the homepage, we just redirect people
 * over there.
 *
 */

var Route = require('../../lib/route');

module.exports = Route.extend({
  redirect: ''
});
