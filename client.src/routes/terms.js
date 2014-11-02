//
// TermsRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import TermsView from '../features/views/terms-view';

export default mn.Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new TermsView());
  }
});
