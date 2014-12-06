//
// login
// A simple endpoint that redirects to Github
// to request authorization
//

// Get the URL for the Github login
var authHelpers = require('../helpers/auth-helpers');
var Cookies = require('cookies');
var tokenHelpers = require('../helpers/token-helpers');

var login = function(req, res, next) {
  var redirectUrl = '/';

  // If we're not in development mode, then we redirect to Github to authenticate
  if (res.locals.env !== 'development') {
    redirectUrl = authHelpers.url();
  }

  // Otherwise, we use hardcoded user data as the token and redirect home
  else {
    var token;
    var cookies = new Cookies(req, res);
    try {
      token = require('../../config/personal-access-token.json').token;
    } catch(e) {
      console.log('Please make a personal access token.');
      console.log('For more info, read: https://github.com/jmeas/gistbook#developing-locally');
    }
    tokenHelpers.setToken(cookies, token);
  }
  res.writeHead(301, {'Content-Type': 'text/plain', 'Location': redirectUrl});
  res.end();
};

module.exports = login;
