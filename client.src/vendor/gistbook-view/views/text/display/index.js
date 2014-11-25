//
// DisplayTextView
// Displays text, first formatted with Markdown, and then Latex.
//

import * as _ from 'underscore';
import * as mn from 'marionette';
import * as marked from 'marked';
import * as emojify from 'emojify.js';

export default mn.ItemView.extend({
  template: false,

  // They're not always displayed as sole gistblocks, such as
  // when they're rendered in an edit view. For those
  // times, the CSS is overwritten.
  className: 'gistblock gistblock-text',

  // After render, check if the user has inputted any text. If so,
  // pass it along to be rendered by Mathjax and Marked.
  onRender: function() {
    var text = this.model.get('source');

    if (!text) { return; }

    this.$el.html(text);
    this._parseText(text);
  },

  // Parse the text of the element as Mathjax, and then pass it along to Marked.
  _parseText: function(text) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.$el[0]]);
    MathJax.Hub.Queue(_.bind(this._parseMarked, this));
  },

  // Parse the element's HTML as Markdown, then set the element's text.
  _parseMarked: function() {
    var $el = this.$el;
    var self = this;
    marked($el.html(), function(err, content) {
      $el.html(content);
      self._parseEmoji(self.el);
    });
  },

  _parseEmoji: function(el) {
    emojify.run(el);
  }
});
