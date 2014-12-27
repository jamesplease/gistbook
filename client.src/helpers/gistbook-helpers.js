//
// gistbookHelpers
//

import * as Radio from 'radio';
import * as homePageGistbook from './home-page.json';

var authChannel = Radio.channel('auth');
var userChannel = Radio.channel('user');

var gistbookHelpers = {

  // Determine if `gist` is a Gistbook
  isGistbook(gist) {
    var files = gist.files;

    // Gistbooks are always single JSON file
    if (!files && files.length !== 1) { return false; }

    // They're always stored as `gistbook.json`
    return !!files['gistbook.json'];
  },

  getHomePage() {
    return homePageGistbook;
  },

  // Returns a new, empty Gistbook – like magic!
  newGistbook() {
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
  createPage() {
    return {
      pageName: '',
      sections: [
        {
          type: 'text',
          source: 'This is a new Gistbook.'
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
  gistbookFromGist(gist) {
    return gistbookHelpers.parseGistfile(gist.get('files')['gistbook.json']);
  },

  // Parses the contents of a gistbook.json file
  parseGistfile(file) {
    return JSON.parse(file.content);
  }
};

export default gistbookHelpers;
