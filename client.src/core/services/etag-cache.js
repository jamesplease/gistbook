//
// ETag Cache
// Caches API resources by ETag
//

var cache = {};

export default {
  set(ETag, data) {
    cache[ETag] = data;
  },

  get(ETag) {
    return cache[ETag] || undefined;
  }
};
