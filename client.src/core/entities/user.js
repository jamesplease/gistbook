//
// GistbookUser
// An object that represents the user of Gistbook
//

import * as bb from 'backbone';
import * as Radio from 'radio';

var userChannel = Radio.channel('user');
var authChannel = Radio.channel('auth');

var User = bb.Model.extend({
  initialize() {
    this._configureEvents();
  },

  _configureEvents() {
    userChannel.reply('user', this);
    this.listenTo(authChannel, 'logout', this.clear);
  }
});

var user = new User(window._initData.user);

export default user;
