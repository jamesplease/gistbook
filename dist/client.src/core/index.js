//
// index
// Bootstrap & start our application
//

// Load our shims. In general, 'shims' are things that directly modify
// Backbone or Marionette. These shims set this app up to be
// in a Marionette v3-like state. I cannot suggest you use them
// unless you're absolutely sure you know what you're doing!
"use strict";
require('../shims/is-node-attached-shim');
require('../shims/get-nested-view-shim');
require('../shims/backbone-sync-shim');
require('../shims/trigger-attach-shim');
require('../shims/render-shim');
require('../shims/to-json-shim');
require('../shims/merge-options-shim');
var app = require('./app').default;
app.start();
