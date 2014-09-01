/*
 * GithubModel
 * A model that represents a Github API resource
 *
 */

var bb = require('backbone');
var githubApiUtil = require('../util/github-api-util');

var GithubModel = bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url;
  }
});

module.exports = GithubModel;
