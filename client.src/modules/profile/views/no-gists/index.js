//
// NoGistsView
// Displayed when a user doesn't have any Gistbooks
//

import * as _ from 'underscore';
import * as mn from 'marionette';

export default mn.ItemView.extend({
  className: 'notification notification-info',
  template: _.template('Aw shucks, it looks like <%- login %> hasn\'t created any Gistbooks yet!')
});
