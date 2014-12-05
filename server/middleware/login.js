/*
 * login
 * A simple endpoint that redirects to Github
 * to request authorization
 *
 */

// Get the URL for the Github login
var authUtil = require('../util/auth-util');
var Cookies = require('cookies');
var tokenUtil = require('../util/token-util');

var login = function(req, res, next) {
  var redirectUrl = '/';

  // If we're not in development mode, then we redirect to Github to authenticate
  if (res.locals.env !== 'development') {
    redirectUrl = authUtil.url();
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
    tokenUtil.setToken(cookies, token);
  }
  res.writeHead(301, {'Content-Type': 'text/plain', 'Location': redirectUrl});
  res.end();
};

module.exports = login;
