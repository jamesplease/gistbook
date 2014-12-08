//
// ContactRoute
//

import * as Radio from 'radio';
import Route from 'base/route';
import ContactView from './views/contact-view';

export default Route.extend({
  show() {
    Radio.command('rootView', 'showIn:container', new ContactView());
  }
});
