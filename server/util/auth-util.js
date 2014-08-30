/*
 * authUtil
 * Useful things for authentication
 *
 */

var github = require('octonode');
var clientInfo = require('../config/client-info.json').dev;

var authUtil = {
  url: function() {
    return github.auth.config({
      id: clientInfo.clientId,
      secret: clientInfo.clientSecret
    }).login(['gist']);
  }
};

module.exports = authUtil;
