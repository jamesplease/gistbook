//
// render
// Overrides the render to support string-based templates
// pulled from the `templates` module, which are the
// pre-compiled JST templates.
//
//

import * as mn from 'marionette';
import * as templates from 'templates';

mn.Renderer.render = function(templateName, data) {
  var err, templateFunc = templates[templateName];

  if (typeof templateName !== 'string') {
    err = 'Templates must be specified by name in Gistbook';
  } else if (!templateFunc) {
    err = 'Cannot render the view because the template was not found.';
  }

  if (err) { throw new Error(err); }
  return templateFunc(data);
};
