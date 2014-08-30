/*
 * env
 * Make our environment available to the client
 *
 */

var Radio = require('radio');
var envChannel = Radio.channel('env');

var env = window._initData.env;

envChannel.reply('env', env);
envChannel.reply('dev', env === 'dev');
envChannel.reply('prod', env === 'prod');

module.exports = env;
