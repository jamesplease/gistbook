//
// AboutRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import Route from '../lib/routing/route';
import AboutView from '../features/views/about-view';

export default Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new AboutView());
  }
});
