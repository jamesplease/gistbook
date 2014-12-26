//
// index
// Bootstrap & start our application
//

// Load our shims. In general, 'shims' are things that directly modify
// Backbone or Marionette. These shims set this app up to be
// in a Marionette v3-like state. I cannot suggest you use them
// unless you're absolutely sure you know what you're doing!
import 'shims/radio-shim';
import 'shims/backbone-sync-shim';
import 'shims/render-shim';
import 'shims/to-json-shim';
import 'shims/merge-options-shim';

// Load and configure emojify
import * as emojify from 'emojify.js';
emojify.setConfig({
  ignore_emoticons: true,
  img_dir: '/img/emoji'
});

// Load our Handlebars helpers
import '../helpers/hbs-helpers';

// Setup dev environment
import dev from './services/dev';
dev.start();

// Start our resource cache
import './services/resource-cache';

// Load & start our app
import app from './app';
app.start();
