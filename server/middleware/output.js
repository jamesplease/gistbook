//
// output
// Returns a cached Gistbook
//

var cache = require('../helpers/page-cache');

module.exports = function(req, res) {
  var token = req.outputId;
  var cached = cache.get(token);
  res.send(cached);
};
