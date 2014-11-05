//
// TermsRoute
//

import * as mn from 'marionette';
import * as Radio from 'radio';
import Route from '../lib/routing/route';
import TermsView from '../features/views/terms-view';

export default Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new TermsView());
  }
});
