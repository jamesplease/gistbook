/*
 * mergeOptionsShim
 * this.getOption is a terrible pattern. This keeps one from
 * having to use that.
 *
 */

var mn = require('marionette');
var _ = require('underscore');

var mergeOptions = function(options, mergeOptions) {
  _.extend(this, _.pick(options, mergeOptions));
};

mn.View.prototype.mergeOptions = mergeOptions;
mn.Object.prototype.mergeOptions = mergeOptions;
