//
// render
// Overrides the render to support string-based templates
// pulled from the `templates` module, which are the
// pre-compiled JST templates.
//
//

import * as mn from 'marionette';
import * as templates from 'templates';

mn.Renderer.render = function(template, data) {
  if (!template) {
    throw new Error('Cannot render the template since its false, null or undefined.',
      'TemplateNotFoundError');
  }

  var templateFunc;
  if (typeof template === 'function') {
    templateFunc = template;
  } else if (typeof template === 'string') {
    templateFunc = templates[template];
  }

  if (!templateFunc) {
    throw new Error('Cannot render the view because the template was not found.');
  }

  return templateFunc(data);
};
