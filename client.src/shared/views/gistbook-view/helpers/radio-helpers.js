//
// radioHelpersHelpers
//

import * as _ from 'underscore';
import * as Radio from 'radio';

var radioHelpers = {

  // Returns a unique channel
  uniqueChannel() {
    return Radio.channel(_.uniqueId('_channel-'));
  },

  // Generate a unique channel name for an object
  // (like a model or collection)
  objChannelName(obj) {
    obj._uniqueId = obj._uniqueId || _.uniqueId();
    return '_obj-' + obj._uniqueId;
  },

  // Get the channel from an obj
  objChannel(obj) {
    return Radio.channel(radioHelpers.objChannelName(obj));
  }
};

export default radioHelpers;
