//
// RootView
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import FooterView from '../footer-view';
import LoginView from '../menu/login-view';
import MenuView from '../menu/menu-view';

var authChannel = Radio.channel('auth');

export default mn.LayoutView.extend({
  el: bb.$('body'),

  regions: {
    header: '.menu',
    container: 'main > div',
    footer: 'footer'
  },

  initialize: function() {
    this.getRegion('footer').show(new FooterView());
    this.showMenu();
    this.listenTo(authChannel, 'logout', this.showMenu);
    var containerRegion = this.getRegion('container');
    Radio.comply('rootView', 'showIn:container', containerRegion.show, containerRegion);
  },

  showMenu: function() {
    var auth = authChannel.request('authorized');
    var model = auth ? Radio.request('user', 'user') : undefined;
    var View = auth ? MenuView : LoginView;
    this.getRegion('header').show(new View({model: model}));
  }
});
