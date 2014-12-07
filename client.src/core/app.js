//
// app
// Define our app, which is just a thin container for
// everything else.
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Intercept from 'backbone.intercept';
import env from './services/env';
import auth from './services/auth';
import user from './entities/user';
import router from './router';
import overlay from './views/overlay';
import rootView from './views/root-view';
import modalWrapper from './views/modal-wrapper';

// Create the app
var app = new mn.Application();

// Attach all of the things
app.env = env;
app.auth = auth;
app.user = user;
app.router = router;
app.overlay = overlay;
app.rootView = rootView;
app.modalWrapper = modalWrapper;

app.VERSION = window._initData.VERSION;

// Attach it to the window for debugging
window.app = app;

// Once the app is ready, start history and interception
app.on('start', () => {
  bb.history.start({pushState: true});
  Intercept.start();
});

export default app;
