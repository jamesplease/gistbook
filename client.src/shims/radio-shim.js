/*
 * radioShim
 * For this app, I'm not using the Channel on Application at all (and
 * you shouldn't be, either), so all I do is overwrite the _initChannel
 * method to do nothing. In v3 it is unlikely that there will be a
 * channel on the Application.
 *
 */

var mn = require('marionette');

mn.Application.prototype._initChannel = function () {};
