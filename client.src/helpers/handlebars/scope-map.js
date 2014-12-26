//
// Scope map helper
//

import * as hbs from 'handlebars';
import scopeMap from '../scope-map';

hbs.registerHelper('scopeMap', scopeName => {
  return scopeMap[scopeName] || scopeName;
});
