//
// Gists
// A Collection of a user's Gists that store Gistbooks
//

import * as _ from 'underscore';
import Gist from 'shared/entities/gist';
import GithubCollection from './github-collection';
import gistbookHelpers from 'helpers/gistbook-helpers';

export default GithubCollection.extend({
  constructor(options) {
    options = options || {};
    this.collectionUrl = options.collectionUrl || this.collectionUrl;
    GithubCollection.prototype.constructor.apply(this, arguments);
  },

  model: Gist,

  // By default we attempt to get the authenticated user's gistbooks
  collectionUrl: '/gists',

  // Only some gists are gistbooks, so we need to filter those out
  parse(gists) {
    return _.filter(gists, gistbookHelpers.isGistbook);
  }
});
