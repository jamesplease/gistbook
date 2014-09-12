/*
 * dev
 * Features and functionality we want to include when we're
 * developing the application
 *
 */

// Turn on debug mode
var Radio = require('radio');
require('radio').DEBUG = true;

// Load up our mock API
require('./mock-api');
