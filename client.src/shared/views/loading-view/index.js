//
// LoadingView
// Displayed inside of the main region when the app is
// transitioning; dims the contents of the region.
//

import ItemView from 'base/item-view';

var LoadingView = ItemView.extend({
  template: 'loadingView',
  className: 'loading-view',
  spinnerOptions: {
    color: '#555',
    lines: 7,
    length: 10,
    width: 5,
    radius: 7
  }
});

export default new LoadingView();
