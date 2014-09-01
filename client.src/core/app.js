/*
 * app
 * Define our app, which is just a thin container for
 * everything else.
 *
 * Note that this is a Marionette v3 prototype application! Don't
 * expect to use any of this code in your app just yet, even if
 * some of it looks cleaner than what's possible in v2. If you're
 * feeling really adventurous, check out the ../shims directory
 * to see all that's changed.
 *
 * We also set into motion all of the pieces
 * that make the webapp work, like routes, link
 * intercepting, and so on.
 *
 */

var bb = require('backbone');
var mn = require('marionette');

// Create the app
var app = new mn.Application();

// Intercept links when the app starts
app.on('start', require('../lib/util/link-util').startIntercepting);

// Start history when the app starts
app.on('start', function() {
  bb.history.start({pushState: true});
});

// Load up authorization
app.auth = new (require('./lib/auth'))();

// Set our environment
app.env = require('./lib/env');

// Set up the router
app.router = require('./router');

app.user = require('../lib/user');

// Create our menu
app.menu = new (require('./lib/menu'))();

// Attach it to the window. This is solely for debugging
// purposes – nothing else
window.app = app;

module.exports = app;
