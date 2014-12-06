//
// authHelpers
// Useful things for authentication
//

var ENV = process.env.NODE_ENV || 'development';
var github = require('octonode');

var authHelpers = {
  url: function() {
    var clientInfo = require('../../config/client-info.json')[ENV];
    return github.auth.config({
      id: clientInfo.clientId,
      secret: clientInfo.clientSecret
    }).login(['gist']);
  }
};

module.exports = authHelpers;
