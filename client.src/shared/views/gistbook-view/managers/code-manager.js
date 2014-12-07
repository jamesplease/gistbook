//
// codeManager
// A gistbook page stores a collection of Models for each type of
// code: HTML, JS, and CSS.
// This manager has methods to loop through the page to get all
// of that data in a form that we can use for sending to the server.
//

import * as _ from 'underscore';
import * as mn from 'marionette';

export default mn.Object.extend({
  codeManagerOptions: ['sections', 'join'],

  // The character used to join separate blocks of source code
  join: '\n',

  initialize: function(options) {
    mn.mergeOptions(this, options, this.codeManagerOptions);
  },

  // Return a hash of the three source codes.
  getCode: function() {
    return {
      html: this.getHtml(),
      css: this.getCss(),
      javascript: this.getJavascript()
    };
  },

  // Retrieve the concatenated HTML from the Gistbook
  getHtml: function() {
    var htmlCollection = this.getSectionsOfType('html');
    return this.concatenate(htmlCollection);
  },

  // Retrieve the concatenated CSS from the Gistbook
  getCss: function() {
    var cssCollection = this.getSectionsOfType('css');
    return this.concatenate(cssCollection);
  },

  // Retrieve the concatenated Javascript from the Gistbook
  getJavascript: function() {
    var jsCollection = this.getSectionsOfType('javascript');
    return this.concatenate(jsCollection);
  },

  // Filter the collection by a particular type. Type should be
  // one of 'html', 'css', or 'javascript'.
  getSectionsOfType: function(type) {
    return this.sections.where({type: type});
  },

  // Returns the concatenated source of a subcollection.
  concatenate: function(subcollection) {
    var result = '';
    var join = this.join;
    var source;
    var length = subcollection.length - 1;
    _.each(subcollection, function(model, index) {
      source = model.get('source');
      result += source ? source : '';
      result += index !== length ? join : '';
    });
    return result;
  }
});
