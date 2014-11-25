import * as bb from 'backbone';
import * as mn from 'marionette';
import dev from './env';

// This is for the Marionette inspector
if (dev && window.__agent && window.__agent.start) {
  window.__agent.start(bb, mn);
}
