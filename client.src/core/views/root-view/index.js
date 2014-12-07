//
// RootView
//

import * as bb from 'backbone';
import * as mn from 'marionette';
import * as Radio from 'radio';
import FooterView from '../footer-view';
import AuthMenuView from '../menu-views/auth-menu-view';
import UnauthMenuView from '../menu-views/unauth-menu-view';

var authChannel = Radio.channel('auth');

var RootView = mn.LayoutView.extend({
  el: bb.$('body'),

  regions: {
    header: '.menu',
    container: 'main > div',
    footer: 'footer'
  },

  initialize() {
    this.getRegion('footer').show(new FooterView());
    this.showMenu();
    this.listenTo(authChannel, 'logout', this.showMenu);
    var containerRegion = this.getRegion('container');
    Radio.comply('rootView', 'showIn:container', containerRegion.show, containerRegion);
  },

  showMenu() {
    var auth = authChannel.request('authorized');
    var model = auth ? Radio.request('user', 'user') : undefined;
    var View = auth ? AuthMenuView : UnauthMenuView;
    this.getRegion('header').show(new View({model: model}));
  }
});

export default new RootView();
