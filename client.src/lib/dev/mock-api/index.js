//
// mockApi
// A fake API to include in the dev build
//

import * as $ from 'jquery';
import 'jquery-mockjax';

// Attach jQuery to the window for testing
window.$ = $;
