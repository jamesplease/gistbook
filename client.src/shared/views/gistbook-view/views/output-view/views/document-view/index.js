//
// documentView
// The HTML document that we build with the user's input. It is injected
// into the iFrame view to render the output.
//

import ItemView from 'base/item-view';

export default ItemView.extend({
  template: 'documentView',

  tagName: 'html',

  // I'm assuming English for now. In the future, this will
  // likely become customizable.
  attributes: {
    lang: 'en'
  },

  // The DOCTYPE declaration for this document
  doctype: '<!DOCTYPE html>',

  newline: '\n',

  // Serialize our element to a string, including the doctype.
  // This is what we send over to the server, and it's ultimately
  // what the server returns back to us for our iFrame source.
  toString() {
    return this.doctype + this.newline + this.el.outerHTML;
  }
});
