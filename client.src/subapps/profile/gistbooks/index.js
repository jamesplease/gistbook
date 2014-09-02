/*
 * GistbooksCollection
 * A Backbone.Collection of a user's Gistbooks
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var GithubCollection = require('../../../lib/github-collection');

var GistbooksCollection  = GithubCollection.extend({
  constructor: function(options) {
    options = options || {};
    this.collectionUrl = options.collectionUrl || this.collectionUrl;
    GithubCollection.prototype.constructor.apply(this, arguments);
  },

  // By default we attempt to get the authenticated user's gistbooks
  collectionUrl: '/gists',

  // Only some gists are gistbooks, so we need to filter those out
  parse: function(gists) {
    return _.filter(gists, this._isGistbook);
  },

  // Determine if a gist is a Gistbook or not
  _isGistbook: function(gist) {
    var files = gist.files;

    // Gistbooks always have a single file
    if (!files || _.size(files) !== 1) { return false; }

    // That file is always named 'gistbook.json'
    return !!files['gistbook.json'];
  }
});

module.exports = GistbooksCollection;
