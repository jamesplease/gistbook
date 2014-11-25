//
// ContactRoute
//

import * as Radio from 'radio';
import Route from '../../vendor/routing/route';
import ContactView from './views/contact-view';

export default Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new ContactView());
  }
});
