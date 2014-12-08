//
// GithubCollection
// A collection that represents a Github API resource
//

import * as _ from 'underscore';
import { BaseCollection } from 'base/entities';
import githubApiHelpers from 'helpers/github-api-helpers';

export default BaseCollection.extend({
  urlRoot: githubApiHelpers.url,

  // This is the property that we set on a per-collection basis
  collectionUrl: '',

  url() {
    return this.urlRoot + _.result(this, 'collectionUrl');
  }
});
