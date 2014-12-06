//
// logout
// This bit of middleware destroys our cookie before redirecting
// the user to the login page
//

var tokenHelpers = require('../helpers/token-helpers');
var Cookies = require('cookies');

// Destroys our token, then redirects us home
var logout = function(req, res, next) {

  // Create an instance of cookies
  var cookies = new Cookies(req, res);

  // Destroy the token. It's no problem if it doesn't exist
  tokenHelpers.destroyToken(cookies);

  // Finally, redirect the user and conclude our response
  res.writeHead(301, {'Content-Type': 'text/plain', 'Location': '/'});
  res.end();
};

module.exports = logout;
