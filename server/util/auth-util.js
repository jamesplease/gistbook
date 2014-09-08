/*
 * authUtil
 * Useful things for authentication
 *
 */

var ENV = process.env.NODE_ENV || 'dev';
var github = require('octonode');
var clientInfo = require('../config/client-info.json')[ENV];

var authUtil = {
  url: function() {
    return github.auth.config({
      id: clientInfo.clientId,
      secret: clientInfo.clientSecret
    }).login(['gist']);
  }
};

module.exports = authUtil;
