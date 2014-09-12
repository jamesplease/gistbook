/*
 * mockApi
 * A fake API to include in the dev build
 *
 */

var $ = require('jquery');
require('jquery-mockjax');

// Attach jQuery to the window for testing
window.$ = $;
