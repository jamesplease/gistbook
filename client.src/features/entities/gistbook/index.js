/*
 * gistbook
 * A simple nested model.
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var githubApiUtil = require('../../../util/github-api-util');

module.exports = bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url + '/gists';
  },

  parse: function(data) {
    return data;
  },

  toJSON: function() {
    this._generateDescription();
    return _.clone(this.attributes);
  },

  _generateDescription: function(data) {
    console.log('got some data!', data);
    return 'View this Gistbook at http://www.gistbook.io/';
  }
});
