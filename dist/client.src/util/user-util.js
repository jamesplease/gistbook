//
// userUtil
//

"use strict";
var Radio = require('radio');

var userChannel = Radio.channel('user');

exports.default = {

  // Determine whether the url is referencing data of the current user
  // using the urlData
  urlMatchesUser: function(urlData) {
    if (!urlData.params) { return false; }
    if (!urlData.params.username) { return false; }
    return userChannel.request('user').get('login') === urlData.params.username;
  }
};
