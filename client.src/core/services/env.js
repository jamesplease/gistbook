//
// env
// The app environment – one of `dev` or `prod`
//

import * as Radio from 'radio';

var envChannel = Radio.channel('env');
var env = window._initData.env;

envChannel.reply({
  env: env,
  dev: env === 'development',
  production: env === 'production',
  staging: env === 'staging'
});

export default env;
