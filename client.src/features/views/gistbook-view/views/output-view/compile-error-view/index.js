//
// CompileErrorView
//

import * as _ from 'underscore';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: 'compileErrorView',
  className: 'notification notification-danger error-view'
});
