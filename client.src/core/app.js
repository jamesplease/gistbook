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

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Intercept from 'backbone.intercept';
import env from '../features/env';
import auth from '../features/auth';
import user from '../features/entities/user';
import modal from '../features/modal';
import router from './router';
import RootView from '../features/views/root-view';

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

export default app;
