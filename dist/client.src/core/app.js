//
// app
// Define our app, which is just a thin container for
// everything else.
//
// Note that this is a Marionette v3 prototype application! Don't
// expect to use all of these patterns in your app just yet. If you're
// curious, check out the ../shims directory to see all that's
// changed.
//

"use strict";
var bb = require('backbone');
var mn = require('marionette');
var Intercept = require('backbone.intercept');
var env = require('./env').default;
var auth = require('../vendor/auth').default;
var user = require('../shared/entities/user').default;
var modal = require('../vendor/modal').default;
var router = require('./router').default;
var RootView = require('./views/root-view').default;

// Create the app
var app = new mn.Application();

// Attach all of the things
app.env = env;
app.auth = auth;
app.user = user;
app.modal = modal;
app.router = router;
app.rootView = new RootView();

// Attach it to the window for debugging
window.app = app;

// Once the app is ready, start history and interception
app.on('start', function() {
  bb.history.start({pushState: true});
  Intercept.start();
});

exports.default = app;
