//
// app
// Define our app, which is just a thin container for
// everything else.
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Intercept from 'backbone.intercept';
import env from './env';
import auth from '../vendor/auth';
import user from '../shared/entities/user';
import router from './router';
import overlay from '../vendor/overlay';
import RootView from './views/root-view';
import modalWrapper from '../vendor/modal-wrapper';
import './dev';

// Create the app
var app = new mn.Application();

// Attach all of the things
app.env = env;
app.auth = auth;
app.user = user;
app.router = router;
app.overlay = overlay;
app.rootView = new RootView();
app.modalWrapper = modalWrapper;

// Attach it to the window for debugging
window.app = app;

// Once the app is ready, start history and interception
app.on('start', function() {
  bb.history.start({pushState: true});
  Intercept.start();
});

export default app;
