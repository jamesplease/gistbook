//
// index
// Bootstrap & start our application
//

// Load our shims. In general, 'shims' are things that directly modify
// Backbone or Marionette. These shims set this app up to be
// in a Marionette v3-like state. I cannot suggest you use them
// unless you're absolutely sure you know what you're doing!
import '../shims/radio-shim';
import '../shims/is-node-attached-shim';
import '../shims/get-nested-view-shim';
import '../shims/backbone-sync-shim';
import '../shims/trigger-attach-shim';
import '../shims/render-shim';
import '../shims/to-json-shim';
import '../shims/merge-options-shim';

import * as emojify from 'emojify.js';

emojify.setConfig({
  ignore_emoticons: true,
  img_dir: '/img/emoji'
});

// Setup dev environment
import dev from './services/dev';
dev.start();

// Configure AJAX to look out for ETag and LastModified headers
import './services/ajax-if-modified';

// Load & start our app
import app from './app';
app.start();
