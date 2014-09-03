/*
 * User
 * A model representing a Github User
 *
 */

var bb = require('backbone');
var githubApiUtil = require('../../util/github-api-util');

module.exports = bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url + '/users';
  }
});
