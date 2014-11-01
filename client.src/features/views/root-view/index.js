//
// RootView
//

var mn = require('backbone.marionette');
var Radio = require('radio');
var FooterView = require('../footer-view');
var LoginView = require('../menu/login-view');
var MenuView = require('../menu/menu-view');

var authChannel = Radio.channel('auth');

module.exports = mn.LayoutView.extend({
  el: $('body'),

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
