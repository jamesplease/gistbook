//
// moduleBundler
// Adds support for 'require' calls in Gistbooks
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as _ from 'underscore';
import * as detective from 'detective';
import * as createCache from 'browser-module-cache';

var cache = createCache({
  name: 'browser-module-cache',
  inMemory: false
});

var ModuleBundler = mn.Object.extend({
  getBundle: function(src) {
    var modules = detective(src);

    if (modules.length === 0) {
      this.trigger('retrieve', src);
      return;
    }

    var allBundles = '';
    var downloads = [];

    var self = this;
    cache.get(function(err, cached) {
      if (err) { throw new Error(err); }

      _.each(modules, function(module) {
        if (cached[module]) {
          allBundles += cached[module].bundle;
        } else {
          downloads.push(module);
        }
      });

      // If everything is cached, then we return
      // all of the cached source
      if (!downloads.length) {
        self.trigger('retrieve', allBundles + src);
        return;
      }

      var dependencies = {};
      _.each(downloads, function(module) {
        dependencies[module] = 'latest';
      });

      var body = {
        options: { debug: true },
        dependencies: dependencies
      };

      return bb.$.post('https://wzrd.bocoup.com/multi', JSON.stringify(body)).then(function(data) {
        _.each(data, function(datum) {
          allBundles += datum.bundle;
        });
        cache.put(data, function() {});
        self.trigger('retrieve', allBundles + src);
      });
    });
  }
});

export default new ModuleBundler();
