// Load dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Paths and variables
const ENV = process.env.NODE_ENV;
const BASE_DIR = __dirname;
const BASE_PATH = path.normalize(BASE_DIR + '/..');
const ASSETS_DIR = ENV === 'development' ? 'client.dev' : 'client.prod';
const ASSETS_PATH = BASE_PATH + '/' + ASSETS_DIR;
const MANIFEST = require('../package.json');
const VERSION = MANIFEST.version;

const VIEWS_DIR = path.join(BASE_DIR, 'views');
const PORT = process.env.PORT || 3000;

// Start the app
var app = express();

// Static files
app.use(express.static(ASSETS_PATH));

// The maximum size of a request
const BODY_LIMIT = '5mb';

// Parse JSON bodies
app.use(bodyParser.json({ limit: BODY_LIMIT }));
app.use(bodyParser.urlencoded({ limit: BODY_LIMIT, extended: true }));

// Templates
const hbsOptions = {
  extname: '.hbs',
  layoutsDir: VIEWS_DIR + '/layouts',
  partialsDir: VIEWS_DIR + '/partials',
  defaultLayout: 'main'
};
app.set('view engine', '.hbs');
app.set('views', VIEWS_DIR);
app.engine('.hbs', exphbs(hbsOptions));

app.locals.VERSION = VERSION;

app.use(require('./middleware/env'));

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

app.get(
  '*',
  require('./middleware/verify'),
  require('./middleware/render')
);

// Start the app
app.listen(PORT);
console.log('Gistbook is listening on port ' + PORT + '.');
