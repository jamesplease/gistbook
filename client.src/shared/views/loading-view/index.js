import * as mn from 'marionette';

var LoadingView = mn.ItemView.extend({
  template: false,

  className: 'loading-view'
});

export default new LoadingView();
