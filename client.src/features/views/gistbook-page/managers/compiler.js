/*
 * compiler
 * Builds our output iFrame view.
 *
 */

var _ = require('underscore');
var bb = require('backbone');
var mn = require('marionette');
var DocumentView = require('../views/output/document-view');
var IFrameView = require('../views/output/iframe');

module.exports = mn.Object.extend({
  url: '/compile',

  initialize: function() {
    _.bindAll(this, 'onPostSuccess', 'onPostError');
  },

  compile: function(code) {

    // Create our document view. This is ultimately what
    // we load into the iFrame.
    var documentView = this.createDocumentView(code);
    
    // Render it, 'cause, you know, we need it to be rendered
    documentView.render();

    // Serialize it so we can send it off to the server
    var serializedView = this.serializeDocumentView(documentView);

    // Finally, post to the server.
    this.post(serializedView)
      .done(this.onPostSuccess)
      .fail(this.onPostError);
  },

  post: function(serializedView) {
    return $.post(this.url, serializedView);
  },

  // If the server responds that we've succeeded, then we
  // create the iFrame and share that the compile was a success.
  onPostSuccess: function(res) {
    var iFrameView = this.createIFrameView(res.token);
    this.trigger('compile', iFrameView);
  },

  // When the server responds that we errored, we emit it as an event.
  onPostError: function(err) {
    console.log('errx');
    // this.trigger('error', err);
  },

  createDocumentView: function(code) {
    return new DocumentView({
      model: new bb.Model(code)
    });
  },

  createIFrameView: function(token) {
    var model = new bb.Model({
      token: token
    });
    return new IFrameView({
      model: model
    });
  },

  serializeDocumentView: function(documentView) {
    return {
      html: documentView.toString()
    };
  }
});
