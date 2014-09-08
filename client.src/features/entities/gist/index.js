/*
 * Gist
 * A model representing a new Github Gist that can
 * store a Gistbook.
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var Radio = require('radio');
var githubApiUtil = require('../../../util/github-api-util');

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

  parse: function(data) {
    var defaults = _.result(this, 'defaults');
    data.description = data.description ? data.description : defaults.description;
    return data;
  },

  _getLoginName: function() {
    return Radio.request('user', 'user').get('login') || 'Anonymous';
  },

  urlRoot: function() {
    return githubApiUtil.url + '/gists';
  }
});
