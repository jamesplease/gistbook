/*
 * env
 * Passes the env along to the client
 *
 */

var env = function(req, res, next) {
  res.env = process.env.NODE_ENV;
  next();
};

module.exports = env;
