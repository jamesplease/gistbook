/*
 * render
 * Renders our template and returns it.
 * Always the last middleware to be called.
 *
 */

var render = function(req, res) {
  return res.render('template');
};

module.exports = render;
