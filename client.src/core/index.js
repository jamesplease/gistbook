//
// index
// Bootstrap & start our application
//

// Load our shims. In general, 'shims' are things that directly modify
// Backbone or Marionette. These shims set this app up to be
// in a Marionette v3-like state. I cannot suggest you use them
// unless you're absolutely sure you know what you're doing!
import '../shims/is-node-attached-shim';
import '../shims/get-nested-view-shim';
import '../shims/backbone-sync-shim';
import '../shims/trigger-attach-shim';
import '../shims/render-shim';
import '../shims/regions-mixin-shim';
import '../shims/to-json-shim';
import '../shims/route-shim';
import '../shims/router-shim';
import '../shims/merge-options-shim';

// Load & start our app
import app from './app';
app.start();
