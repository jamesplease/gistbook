//
// AboutRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import AboutView from '../features/views/about-view';

export default mn.Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new AboutView());
  }
});
