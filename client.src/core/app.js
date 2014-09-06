/*
 * app
 * Define our app, which is just a thin container for
 * everything else.
 *
 * Note that this is a Marionette v3 prototype application! Don't
 * expect to use any of this code in your app just yet, even if
 * some of it looks cleaner than what's possible in v2. If you're
 * curious, check out the ../shims directory to see all that's
 * changed.
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

// Load up all the things
if (app.env === 'dev') { require('../features/dev'); }
app.auth = new (require('../features/auth'))();
app.env = require('../features/env');
app.modal = require('../features/modal');
app.user = require('../features/entities/user');
app.router = require('./router');
app.menu = new (require('../features/menu'))();

// Attach it to the window. This is solely for debugging
// purposes – nothing else
window.app = app;

module.exports = app;
