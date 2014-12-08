//
// LoadingView
// Displayed inside of the main region when the app is
// transitioning; dims the contents of the region.
//

import ItemView from 'base/item-view';

var LoadingView = ItemView.extend({
  template: 'loadingView',
  className: 'loading-view'
});

export default new LoadingView();
