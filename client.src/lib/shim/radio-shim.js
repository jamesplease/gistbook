/*
 * radio.shim
 * For this app, I'm not using the Channel on Application at all.
 * So all I do is overwrite the _initChannel method to do nothing.
 *
 */

var mn = require('marionette');
var Radio = require('radio');
var _ = require('underscore');

mn.Application.prototype._initChannel = function () {
  this.channelName = _.result(this, 'channelName') || 'global';
  this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
};
