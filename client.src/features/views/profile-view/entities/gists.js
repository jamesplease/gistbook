//
// Gists
// A Collection of a user's Gists that store Gistbooks
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import Gist from '../../../entities/gist';
import GithubCollection from '../../../entities/github-collection';
import gistbookUtil from '../../../../util/gistbook-util';

export default GithubCollection.extend({
  constructor: function(options) {
    options = options || {};
    this.collectionUrl = options.collectionUrl || this.collectionUrl;
    GithubCollection.prototype.constructor.apply(this, arguments);
  },

  model: Gist,

  // By default we attempt to get the authenticated user's gistbooks
  collectionUrl: '/gists',

  // Only some gists are gistbooks, so we need to filter those out
  parse: function(gists) {
    return _.filter(gists, gistbookUtil.isGistbook);
  }
});
