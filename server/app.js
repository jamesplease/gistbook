// Load dependencies
var express = require('express');
var path = require('path');

// Start the app
var app = express();

// Paths and variables
var BASE_DIR = __dirname;
var viewsDir = path.join(BASE_DIR, 'views');
var port = process.env.PORT || 3000;
var ENV = process.env.NODE_ENV;

var bodyParser = require('body-parser');

var staticFileLoc = 'client.' + ENV;

// Static files
app.use(express.static(staticFileLoc));

// The maximum size of a request (5mb)
const bodyLimit = 5000000;

// Parse JSON bodies
app.use(bodyParser.json({ limit: bodyLimit }));
app.use(bodyParser.urlencoded({ limit: bodyLimit }));

// Templates
app.set('view engine', 'html');
app.set('views', viewsDir);
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));

app.get(
  '/login',
  require('./middleware/login')
);

app.get(
  '/logout',
  require('./middleware/logout')
);

app.get(
  '/github/auth',
  require('./middleware/auth-callback')
);

app.post(
  '/compile',
  require('./middleware/compile')
);

app.param('outputId', function (req, res, next, outputId) {
  req.outputId = outputId;
  next();
});

app.get(
  '/output/:outputId',
  require('./middleware/output')
);

// This might seem like a crazy regex,
// but it matches the root directory,
// and one-level deep directories that
// contain letters, numbers, -, or .
app.get(
  '*',
  require('./middleware/verify'),
  require('./middleware/env'),
  require('./middleware/render')
);

// Start the app
app.listen(port);
console.log('Gistbook is listening on port ' + port + '.');
