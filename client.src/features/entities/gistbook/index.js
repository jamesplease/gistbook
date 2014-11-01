//
// gistbook
// A Model for a Gistbook
//

var _ = require('underscore');
var bb = require('backbone');
var githubApiUtil = require('../../../util/github-api-util');

module.exports = bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url + '/gists';
  }
});
