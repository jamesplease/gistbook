//
// BaseEntities
// These are the base models and collections. They have been
// updated to support resource caching via ETags, though
// at the cost of much duplication of Backbone code.
//

import * as bb from 'backbone';

export var BaseModel = bb.Model.extend({});
export var BaseCollection = bb.Collection.extend({});
