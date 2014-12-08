//
// Gist
// A model representing a new Github Gist that can
// store a Gistbook.
//

import * as _ from 'underscore';
import * as Radio from 'radio';
import { BaseModel } from 'base/entities';
import githubApiHelpers from 'helpers/github-api-helpers';

export default BaseModel.extend({
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
