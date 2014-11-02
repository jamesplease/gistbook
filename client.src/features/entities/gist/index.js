//
// Gist
// A model representing a new Github Gist that can
// store a Gistbook.
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import * as Radio from 'radio';
import githubApiUtil from '../../../util/github-api-util';

export default bb.Model.extend({
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
