//
// gistbookHelpers
//

import * as Radio from 'radio';

var authChannel = Radio.channel('auth');
var userChannel = Radio.channel('user');

var gistbookHelpers = {

  // Determine if `gist` is a Gistbook
  isGistbook: function(gist) {
    var files = gist.files;

    // Gistbooks are always single JSON file
    if (!files && files.length !== 1) { return false; }

    // They're always stored as `gistbook.json`
    return !!files['gistbook.json'];
  },

  // Returns a new, empty Gistbook – like magic!
  newGistbook: function() {
    var author = 'Anonymous';
    if (authChannel.request('authorized')) {
      author = userChannel.request('user').get('login');
    }
    return {
      title: 'Anonymous Gistbook',
      author: author,
      pages: [gistbookHelpers.createPage()],
      public: true
    };
  },

  // Create an empty Gistbook page
  createPage: function() {
    return {
      pageName: '',
      sections: [
        {
          type: 'text',
          source: 'Welcome to Gistbook!'
        },
        {
          type: 'html',
          source: ''
        },
        {
          type: 'css',
          source: ''
        },
        {
          type: 'javascript',
          source: ''
        }
      ]
    };
  },

  // Takes in a Github Gist, get back a Gistbook Javascript object
  gistbookFromGist: function(gist) {
    return gistbookHelpers.parseGistfile(gist.get('files')['gistbook.json']);
  },

  // Parses the contents of a gistbook.json file
  parseGistfile: function(file) {
    return JSON.parse(file.content);
  }
};

export default gistbookHelpers;
