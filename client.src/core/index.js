/*
 * index
 * Bootstrap & start our application
 *
 */

// Load our shims
require('../lib/shim/radio-shim');
require('../lib/shim/to-json-shim');
require('../lib/shim/merge-options-shim');

// Load & start our app
require('./app').start();
