//
// GithubUser
// A model representing a Github User
//

import * as bb from 'backbone';
import githubApiUtil from '../../util/github-api-util';

export default bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url + '/users';
  }
});
