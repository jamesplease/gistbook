/*
 * Gist
 * A model representing a new Github Gist that can
 * store a Gistbook.
 *
 */

var bb = require('backbone');
var Radio = require('radio');
var githubApiUtil = require('../../util/github-api-util');

module.exports = bb.Model.extend({
  defaults: function() {
    return {
      description: 'Anonymous Gistbook',
      owner: {
        login: this._getLoginName()
      },
      files: {
        "gistbook.json": {
          content: "{}"
        }
      }
    };
  },

  _getLoginName: function() {
    return Radio.request('user', 'user').get('login') || 'Anonymous';
  },

  urlRoot: function() {
    return githubApiUtil.url + '/gists';
  }
});
