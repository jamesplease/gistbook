//
// ajaxIfModified
// Configure jQuery to handle resources
// that haven't been modified since the last
// request
//

import * as $ from 'jquery';

$.ajaxSetup({
  ifModified: true
});
