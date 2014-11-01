//
// Gists
// A Collection of a user's Gists that store Gistbooks
//

var _ = require('underscore');
var bb = require('backbone');
var Gist = require('../../../entities/gist');
var GithubCollection = require('../../../entities/github-collection');
var gistbookUtil = require('../../../../util/gistbook-util');

module.exports = GithubCollection.extend({
  constructor: function(options) {
    options = options || {};
    this.collectionUrl = options.collectionUrl || this.collectionUrl;
    GithubCollection.prototype.constructor.apply(this, arguments);
  },

  model: Gist,

  // By default we attempt to get the authenticated user's gistbooks
  collectionUrl: '/gists',

  // Only some gists are gistbooks, so we need to filter those out
  parse: function(gists) {
    return _.filter(gists, gistbookUtil.isGistbook);
  }
});
