/*
 * mockApi
 * A fake API to include in the dev build
 *
 */

var $ = require('jquery');
// Load up mockjax
require('jquery-mockjax');

console.log('ok');

$.mockjax({
  url: '/restful/fortune',
  responseTime: 1500,
  responseText: {
    status: 'success',
    fortune: 'Are you a turtle?'
  }
});

// Attach jQuery to the window for testing
window.$ = $;
