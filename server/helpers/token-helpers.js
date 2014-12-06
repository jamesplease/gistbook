//
// tokenHelpers
// Useful functions for working with our token. To use them,
// pass in the instance of cookies.
//

// How many years til the token expires
const TOKEN_EXPIRATION = 1;

var tokenHelpers = {

  // Destroy the auth token
  destroyToken: function(cookies) {
    var now = new Date();
    var thePast = new Date();
    thePast.setYear(now.getFullYear() - 1);

    var destroyOptions = {
      expires: thePast,
      httpOnly: false,
      overwrite: true
    };

    cookies.set('token', '', destroyOptions);
  },

  setToken: function(cookies, token) {
    var now = new Date();
    var oneYr = new Date();
    oneYr.setYear(now.getFullYear() + TOKEN_EXPIRATION);

    var cookieOptions = {
      expires: oneYr,
      httpOnly: false,
      overwrite: true
    };

    cookies.set('token', token, cookieOptions);
  }
};

module.exports = tokenHelpers;
