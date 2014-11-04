//
// ModalWrapper
// Wraps views that are displayed as modals. Provides the
// overlay mask for closing modals.
//

import Wrapper from '../../views/wrapper';

export default Wrapper.extend({
  template: 'modalWrapper',

  className: 'modal-container',

  ui: {
    overlay: '.modal-overlay',
    close: '.close'
  },

  events: {
    'click @ui.overlay': 'destroyView',
    'click @ui.close': 'destroyView'
  },

  region: '.modal-window',

  onShowView: function(view) {
    this.$el.addClass('show');
  },

  onBeforeDestroyView: function() {
    this.$el.removeClass('show');
  }
});

