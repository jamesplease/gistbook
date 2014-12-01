//
// compiler
// Builds our output iFrame view.
//

import * as $ from 'jquery';
import * as _ from 'underscore';
import * as bb from 'backbone';
import * as mn from 'marionette';
import DocumentView from '../views/output/document-view';
import IFrameView from '../views/output/iframe';

export default mn.Object.extend({
  url: '/compile',

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
      .then(_.bind(this.onPostSuccess, this))
      .catch(_.bind(this.onPostError, this));
  },

  post: function(serializedView) {
    return Promise.resolve($.post(this.url, serializedView));
  },

  // If the server responds that we've succeeded, then we
  // create the iFrame and share that the compile was a success.
  onPostSuccess: function(res) {
    var iFrameView = this.createIFrameView(res.token);
    this.trigger('compile', iFrameView);
  },

  // When the server responds that we errored, we emit it as an event.
  onPostError: function(err) {
    this.trigger('error:compile', err);
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
