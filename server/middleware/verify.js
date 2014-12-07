//
// verify
// Verifies that our login token still works
//

var github = require('octonode');
var Cookies = require('cookies');
var tokenHelpers = require('../helpers/token-helpers');

var verify = function(req, res, next) {
  var cookies = new Cookies(req, res);
  var token = cookies.get('token');

  res.locals.authorized = false;

  // If we have no token, move along
  if (!token) {
    next();
  }

  // Otherise we do have the token and should verify it
  else {
    var client = github.client(token);
    req.client = client;

    client.get('/user', {}, function(err, status, body, header) {
      if (err) {
        tokenHelpers.destroyToken(cookies);
      }
      else {

        // Check to see if gists are included in our scopes
        var scopes = header['x-oauth-scopes'].split(', ');
        // If it's not there, destroy the cookie
        if (scopes.indexOf('gist') == -1) {
          tokenHelpers.destroyToken(cookies);
        } else {
          req.authorized = true;
          res.locals.authorized = true;

          // Gather useful data from the response
          body.scopes = scopes;
          res.locals.user = JSON.stringify(body);
          res.locals.rateMax = header['x-ratelimit-limit'];
          res.locals.rateLeft = header['x-ratelimit-remaining'];
          res.locals.rateReset = header['x-ratelimit-reset'];
        }
      }
      next();
    });
  }
};

module.exports = verify;
