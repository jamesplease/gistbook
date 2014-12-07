//
// Gist
// A model representing a new Github Gist that can
// store a Gistbook.
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import * as Radio from 'radio';
import githubApiHelpers from '../../helpers/github-api-helpers';

export default bb.Model.extend({
  defaults() {
    return {
      description: 'Anonymous Gistbook',
      owner: {
        login: this._getLoginName()
      },
      files: {
        'gistbook.json': {
          content: '{}'
        }
      }
    };
  },

  parse(data) {
    var defaults = _.result(this, 'defaults');
    data.description = data.description ? data.description : defaults.description;
    return data;
  },

  _getLoginName() {
    return Radio.request('user', 'user').get('login') || 'Anonymous';
  },

  urlRoot() {
    return githubApiHelpers.url + '/gists';
  }
});
