//
// env
// The app environment – one of `dev` or `prod`
//

"use strict";
var Radio = require('radio');

var envChannel = Radio.channel('env');
var env = window._initData.env;

envChannel.reply({
  env: env,
  dev: env === 'dev',
  prod: env === 'prod'
});

exports.default = env;
