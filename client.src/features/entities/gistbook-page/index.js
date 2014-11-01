//
// GistbookPage
// A Model for a Gistbook Page
//

var _ = require('underscore');
var bb = require('backbone');

module.exports = bb.Model.extend({
  toJSON: function() {
    var data = bb.Model.prototype.toJSON.apply(this, arguments);
    var filteredData = _.filter(data.sections, function(section) {
      return /\S/.test(section.source);
    });
    data.sections = filteredData;
    return data;
  }
});
