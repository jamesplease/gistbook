//
// compile
// Returns a URL to access the HTML that you send over
//

var cache = require('../helpers/page-cache');

var token = function() {
  return Math.random().toString(36).slice(2);
};

module.exports = function(req, res) {
  var randomToken = token();
  cache.set(randomToken, req.body.html);
  res.send({
    token: randomToken
  });
};
