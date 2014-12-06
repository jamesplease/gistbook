//
// authCallback
// This is the endpoint that Github redirects us to after
// we attempt a login. All that it does is forward you along
// to the base route.
//

// Get the URL for the Github login
var github = require('octonode');
var Cookies = require('cookies');
var tokenHelpers = require('../helpers/token-helpers');

// Redirect us to the Github login URL
var authCallback = function(req, res, next) {
  var cookies = new Cookies(req, res);

  github.auth.login(req.query.code, function(err, token) {
    // If we got a token, save it to a cookie
    if (token) {
      tokenHelpers.setToken(cookies, token);
    }
    // Then redirect the user
    res.writeHead(301, {'Content-Type': 'text/plain', 'Location': '/'});
    res.end();
  });
};

module.exports = authCallback;
