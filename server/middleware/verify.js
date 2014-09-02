/*
 * verify
 * Verifies that our login token still works
 *
 */

var github = require('octonode');
var Cookies = require('cookies');
var tokenUtil = require('../util/token-util');

var verify = function(req, res, next) {
  var cookies = new Cookies(req, res);
  var token = cookies.get('token');

  res.authorized = false;

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
        tokenUtil.destroyToken(cookies);
      }
      else {

        // Check to see if gists are included in our scopes
        var scopes = header['x-oauth-scopes'].split(',');
        // If it's not there, destroy the cookie
        if (scopes.indexOf('gist') == -1) {
          tokenUtil.destroyToken(cookies);
        } else {
          req.authorized = true;
          res.authorized = true;

          // Gather useful data from the response
          body.scopes = scopes;
          res.user = JSON.stringify(body);
          res.rateMax = header['x-ratelimit-limit'];
          res.rateLeft = header['x-ratelimit-remaining'];
          res.rateReset = header['x-ratelimit-reset'];
        }
      }
      next();
    });
  }
};

module.exports = verify;
