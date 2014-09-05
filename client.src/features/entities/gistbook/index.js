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
  },

  // Create the nesting
  // parse: function(data) {
  //   // data.files = new bb.Collection(data.files);
  //   return data;
  // },

  // // Serialize the Gistbook for Github's API
  // toJSON: function() {
  //   var requestBody = {};
  //   requestBody.description = this.get('');
  //   var data = bb.Model.prototype.toJSON.call(this);
  //   data.blocks = this.get('blocks').toJSON();
  //   return data;
  // }
});
