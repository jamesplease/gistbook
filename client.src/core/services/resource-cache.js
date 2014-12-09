//
// Resource Cache
// Caches API resources by URI
//

import * as _ from 'underscore';
import * as $ from 'jquery';

var cache = {};
var $document = $(document);
var cacheTypes = ['PUT', 'GET', 'POST', 'PATCH'];

$(document).ajaxSuccess(function(event, xhr, settings) {
  var baseUrl = settings.url.split('?')[0];
  var cacheEntry = cache[baseUrl];

  // Do nothing if the request type isn't one that we cache
  if (!_.contains(cacheTypes, settings.type)) { return; }

  // Upon success, we save the response to the cache
  xhr.then(function(resp, textStatus, jqXHR) {
    if (!textStatus !== 'notmodified') {
      cache[baseUrl] = resp;
    }
  });
});

export default {
  get(uri) {
    return cache[uri] || undefined;
  }
};
