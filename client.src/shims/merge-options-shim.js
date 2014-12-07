//
// mergeOptionsShim
// this.getOption is a terrible pattern. This keeps one from
// having to use that.
//

import * as mn from 'marionette';
import * as _ from 'underscore';

mn.mergeOptions = function(target, options, mergeOptions) {
  if (!options) { return; }
  _.extend(target, _.pick(options, mergeOptions));
};
