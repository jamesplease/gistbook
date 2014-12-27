//
// Gistbook
// A model representing a new Gistbook
//

import * as _ from 'underscore';
import { BaseModel, BaseCollection } from 'base/entities';

export default BaseModel.extend({
  initialize() {
    this._dirty = false;
    this.on('change', this._markDirty, this);
    this.listenTo(this.get('pages'), 'change', this._markDirty);
  },

  // Create a deeply nested model structure
  // Gistbooks have a collection of pages
  // Pages have a collection of sections
  parse(data) {
    data = _.clone(data);

    // Create our nested pages
    data.pages = new BaseCollection(data.pages);

    // Loop through each page...
    data.pages.each(page => {

      // ...to create our nested sections
      page.set({
        sections: new BaseCollection(page.get('sections'))
      }, {silent: true});

      // And forward all events from our sections to our pages
      page.listenTo(page.get('sections'), 'all', function() {
        page.trigger.apply(page, arguments);
      });
    });
    return data;
  },

  isDirty() {
    return !!this._dirty;
  },

  _markDirty() {
    this._dirty = true;
  },
});
