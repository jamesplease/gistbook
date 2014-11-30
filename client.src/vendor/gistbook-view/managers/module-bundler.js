//
// moduleBundler
// Adds support for 'require' calls in Gistbooks
//

import * as bb from 'backbone';
import * as _ from 'underscore';
import * as detective from 'detective';

export default {
  getBundle: function(src) {
    var modules = detective(src);

    if (modules.length === 0) {
      return Promise.resolve(src);
    }

    var dependencies = {};

    _.each(modules, function(module) {
      dependencies[module] = 'latest';
    });

    var body = {
      options: { debug: true },
      dependencies: dependencies
    };

    return bb.$.post('http://wzrd.bocoup.com/multi', JSON.stringify(body)).then(function(data) {
      var js = '';
      _.each(data, function(datum) {
        js += datum.bundle;
      });
      return js + src;
    });
  }
};
