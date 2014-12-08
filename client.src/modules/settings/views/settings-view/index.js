//
// SettingsView
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import * as Radio from 'radio';
import RevokeModalView from '../revoke-modal';
import scopeMap from 'helpers/scope-map';

export default mn.ItemView.extend({
  template: 'settingsView',

  className: 'settings',

  ui: {
    revoke: 'button.danger'
  },

  events: {
    'click @ui.revoke': 'onRevoke'
  },

  templateHelpers: {

    // Attempts to find a user-friendly version of the scope name
    mapScope(scopeName) {
      return _.result(scopeMap, scopeName) || scopeName;
    }
  },

  onRevoke() {
    Radio.command('modal', 'show', new RevokeModalView());
  }
});
