/*
 * gistbookUtil
 *
 */

var _ = require('underscore');

var gistbookUtil = {

  // Determine if `gist` is a Gistbook
  isGistbook: function(gist) {
    var files = gist.files;

    // Gistbooks are always single JSON file
    if (!files && files.length !== 1) { return false; }

    // They're always stored as `gistbook.json`
    return !!files['gistbook.json'];
  },

  // Takes in a Github Gist, get back a Gistbook Javascript object
  gistbookFromGist: function(gist) {
    return gistbookUtil.parseGistfile(gist.files['gistbook.json']);
  },

  // Parses the contents of a gistbook.json file
  parseGistfile: function(file) {
    return JSON.parse(file.content);
  }
};

module.exports = gistbookUtil;
