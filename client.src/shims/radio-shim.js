//
// Radio Shim
// We're loading Radio in place of Wreqr in this
// app, but Marionette's Application will attempt
// to create a channel with Wreqr's API. This
// overrides that method to be a noop instead.
//

import * as mn from 'marionette';

mn.Application.prototype._initChannel = function() {};
