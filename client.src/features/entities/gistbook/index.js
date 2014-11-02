//
// gistbook
// A Model for a Gistbook
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import githubApiUtil from '../../../util/github-api-util';

export default bb.Model.extend({
  urlRoot: function() {
    return githubApiUtil.url + '/gists';
  }
});
