/*
 * link-util
 * Intercepts links and passes them along to the Router
 *
 */

var $ = require('jquery');
var Radio = require('radio');

var routerChannel = Radio.channel('router');
var $body = $('body');

var linkUtil = {

  // The handler for a clicked link. See if we should handle it internally
  // or not.
  intercept: function(e) {

    // Do nothing if it wasn't a left-click
    if (e.which !== 1) {
      return;
    }

    var $currentTarget = $(e.currentTarget);

    var intercept = $currentTarget.attr('mn-intercept') || true;

    if (intercept === 'false' || !intercept) {
      return;
    }

    e.preventDefault();
    var href = $currentTarget.attr('href');

    // Return if there's no URL
    if (!href) { return; }

    // Return if the URL is absolute. `http://` is required.
    if (/^(?:\w+:)?\/\//.test(href)) { return; }

    // Send it off to the router
    routerChannel.command('navigate', href);
  },

  // Start intercepting links
  startIntercepting: function() {
    $body.on('click', 'a', linkUtil.intercept);
  },

  // Stop intercepting links
  stopIntercepting: function() {
    $body.off('click', 'a', linkUtil.intercept);
  }
};

module.exports = linkUtil;
