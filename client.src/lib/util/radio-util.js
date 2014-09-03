/*
 * radioUtil
 *
 */

var _ = require('underscore');
var Radio = require('radio');

var radioUtil = {

  // Returns a unique channel
  uniqueChannel: function() {
    return Radio.channel(_.uniqueId('_channel-'));
  }
};

module.exports = radioUtil;
