//
// TermsRoute
//

import * as Radio from 'radio';
import Route from '../../base/route';
import TermsView from './views/terms-view';

export default Route.extend({
  show: function() {
    Radio.command('rootView', 'showIn:container', new TermsView());
  }
});
