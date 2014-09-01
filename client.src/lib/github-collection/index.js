/*
 * GithubCollection
 * A collection that represents a Github API resource
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var githubApiUtil = require('../util/github-api-util');

var GithubCollection = bb.Collection.extend({
  urlRoot: githubApiUtil.url,

  // This is the property that we set on a per-collection basis
  collectionUrl: '',

  url: function() {
    return this.urlRoot + _.result(this, 'collectionUrl');
  }
});

module.exports = GithubCollection;
