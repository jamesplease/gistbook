//
// CompileErrorView
//

var _ = require('underscore');
var mn = require('marionette');

module.exports = mn.ItemView.extend({
  template: 'compileErrorView',
  className: 'notification notification-danger error-view'
});
