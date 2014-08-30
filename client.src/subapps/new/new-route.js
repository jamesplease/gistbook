/*
 * NewRoute
 * The /new route is where we make a Gistbook. Because
 * that's done on the homepage, we just move people over
 * there.
 *
 */

var mn = require('marionette');
var Route = require('../../lib/route');

var NewRoute = Route.extend({
  redirect: ''
});

module.exports = NewRoute;
