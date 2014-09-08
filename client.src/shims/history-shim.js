/*
 * Backbone.history
 * History gobbles up options passed to navigate, and I need
 * them to be returned to the Router. So all of this complexity
 * is to support this.
 *
 */

var _ = require('underscore');
var bb = require('backbone');

var History = bb.History;

var routeStripper = /^[#\/]|\s+$/g;
var rootStripper = /^\/+|\/+$/g;
var pathStripper = /#.*$/;

bb.history.navigate = function(fragment, options) {
  if (!History.started) return false;
  if (!options || options === true) options = {trigger: !!options};
  var url = this.root + (fragment = this.getFragment(fragment || ''));

  // Strip the hash and decode for matching.
  fragment = decodeURI(fragment.replace(pathStripper, ''));

  if (this.fragment === fragment) return;
  this.fragment = fragment;

  // Don't include a trailing slash on the root.
  if (fragment === '' && url !== '/') url = url.slice(0, -1);

  // If pushState is available, we use it to set the fragment as a real URL.
  if (this._hasPushState) {
    this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

  // If hash changes haven't been explicitly disabled, update the hash
  // fragment to store history.
  } else if (this._wantsHashChange) {
    this._updateHash(this.location, fragment, options.replace);
    if (this.iframe && (fragment !== this.getHash(this.iframe))) {
      // Opening and closing the iframe tricks IE7 and earlier to push a
      // history entry on hash-tag change.  When replace is true, we don't
      // want this.
      if(!options.replace) this.iframe.document.open().close();
      this._updateHash(this.iframe.location, fragment, options.replace);
    }

  // If you've told us that you explicitly don't want fallback hashchange-
  // based history, then `navigate` becomes a page refresh.
  } else {
    return this.location.assign(url);
  }
  if (options.trigger) return this.loadUrl(fragment, options);
};

bb.history.loadUrl = function(fragment, options) {
  fragment = this.fragment = this.getFragment(fragment);
  return _.any(this.handlers, function(handler) {
    if (handler.route.test(fragment)) {
      handler.callback(fragment, options);
      return true;
    }
  });
};
