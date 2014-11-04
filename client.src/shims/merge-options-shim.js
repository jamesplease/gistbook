//
// mergeOptionsShim
// this.getOption is a terrible pattern. This keeps one from
// having to use that.
//

import * as mn from 'marionette';
import * as _ from 'underscore';

var mergeOptions = function(options, mergeOptions) {
  _.extend(this, _.pick(options, mergeOptions));
};

mn.View.prototype.mergeOptions = mergeOptions;
mn.Object.prototype.mergeOptions = mergeOptions;
