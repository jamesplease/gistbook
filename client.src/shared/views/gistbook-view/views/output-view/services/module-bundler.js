//
// moduleBundler
// Adds support for 'require' calls in Gistbooks
//

import * as _ from 'underscore';
import * as bb from 'backbone';
import * as mn from 'marionette';
import * as detective from 'detective';
import * as createCache from 'browser-module-cache';

var cache = createCache({
  name: 'browser-module-cache',
  inMemory: false
});

var ModuleBundler = mn.Object.extend({
  getBundle(src) {
    var modules = detective(src);

    if (modules.length === 0) {
      this.trigger('retrieve', src);
      return;
    }

    var allBundles = '';
    var downloads = [];

    cache.get((err, cached) => {
      if (err) { throw new Error(err); }

      _.each(modules, module => {
        if (cached[module]) {
          allBundles += cached[module].bundle;
        } else {
          downloads.push(module);
        }
      });

      // If everything is cached, then we return
      // all of the cached source
      if (!downloads.length) {
        this.trigger('retrieve', allBundles + src);
        return;
      }

      var dependencies = {};
      _.each(downloads, module => {
        dependencies[module] = 'latest';
      });

      var body = {
        options: { debug: true },
        dependencies: dependencies
      };

      return bb.$.post('https://wzrd.bocoup.com/multi', JSON.stringify(body)).then(data => {
        _.each(data, datum => {
          allBundles += datum.bundle;
        });
        cache.put(data, () => {
          this.trigger('retrieve', allBundles + src);
        });
      });
    });
  }
});

export default new ModuleBundler();
