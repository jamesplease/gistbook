/*
 * login
 * A simple endpoint that redirects to Github
 * to request authorization
 *
 */

// Get the URL for the Github login
var authUtil = require('../util/auth-util');

// Redirect us to the Github login URL
var login = function( req, res, next ) {
  res.writeHead(301, {'Content-Type': 'text/plain', 'Location': authUtil.url()});
  res.end();
};

module.exports = login;
