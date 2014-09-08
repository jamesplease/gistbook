/*
 * env
 * Passes the env along to the client
 *
 */

var env = function(req, res, next) {
  res.env = process.env.NODE_ENV;
  res.devMode = res.env === 'dev';
  next();
};

module.exports = env;
