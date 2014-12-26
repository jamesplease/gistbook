//
// Error 404 View
// Displayed in the main region whenever there's a
// 404 error response from the server. Ruh roh!
//

import * as mn from 'marionette';

export default mn.ItemView.extend({
  template: 'error404View',
  className: 'error-404'
});
