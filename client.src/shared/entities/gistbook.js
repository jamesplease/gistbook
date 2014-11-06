//
// gistbook
// A Model for a Gistbook
//

import * as bb from 'backbone';
import githubApiHelpers from '../../helpers/github-api-helpers';

export default bb.Model.extend({
  urlRoot: function() {
    return githubApiHelpers.url + '/gists';
  }
});
