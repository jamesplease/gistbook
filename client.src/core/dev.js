//
// dev
// Things that we want to activate in dev mode only
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import env from './env';

export default {
  start() {
    if (env !== 'development') { return; }

    // Configure for the Marionette Inspector
    if (window.__agent && window.__agent.start) {
      window.__agent.start(bb, mn);
    }

    // Turn on DEBUG mode for Radio
    Radio.DEBUG = true;
  }
};
