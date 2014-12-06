//
// routeBuilder
// Specify Express routes declaratively
//

module.exports = function (express, routes) {
  var router = express.Router();
  Object.keys(routes).forEach(function (verb) {
     var endpoints = routes[verb];
     Object.keys(endpoints).forEach(function (endpoint) {
       router[verb].call(router, endpoint, endpoints[endpoint]);
     });
  });
  return router;
};
