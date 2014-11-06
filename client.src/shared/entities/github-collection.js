//
// GithubCollection
// A collection that represents a Github API resource
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import githubApiUtil from '../../util/github-api-util';

export default bb.Collection.extend({
  urlRoot: githubApiUtil.url,

  // This is the property that we set on a per-collection basis
  collectionUrl: '',

  url: function() {
    return this.urlRoot + _.result(this, 'collectionUrl');
  }
});
