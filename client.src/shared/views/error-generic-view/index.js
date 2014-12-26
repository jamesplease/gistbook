//
// Error Generic View
// If the error isn't one of the ones we specifically
// target, then we display this view
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: 'errorGenericView',
  className: 'error-generic'
});
