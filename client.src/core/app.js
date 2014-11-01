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

var bb = require('backbone');
var mn = require('marionette');
var Intercept = require('backbone.intercept');

// Create the app
var app = new mn.Application();

// Load up all the things
app.env = require('../features/env');
if (app.env === 'dev') { require('../features/dev'); }
app.auth = require('../features/auth');
app.modal = require('../features/modal');
app.user = require('../features/entities/user');
app.rootView = require('./root-view');
app.router = require('./router');

// Attach it to the window. This is solely for debugging
// purposes – nothing else
window.app = app;

app.on('start', function() {
  bb.history.start({pushState: true});
  Intercept.start();
});

module.exports = app;
