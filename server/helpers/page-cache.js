//
// pageCache
// Caches our pages
// 

// Our cache
var cache = {};

module.exports = {
  set: function(uniqueId, html) {
    cache[uniqueId] = html;
  },

  // If the object exists in the cache,
  // delete it from the cache and then
  // return it. This ensures that each request
  // is done a single time
  get: function(uniqueId) {
    if (cache[uniqueId]) {
      var obj = cache[uniqueId];
      delete cache[uniqueId];
      return obj;
    }
  }
};
