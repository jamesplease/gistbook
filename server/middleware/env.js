//
// env
// Passes the env along to the client
//

var env = function(req, res, next) {
  res.locals.env = process.env.NODE_ENV;
  res.locals.devMode = res.locals.env === 'development';
  next();
};

module.exports = env;
