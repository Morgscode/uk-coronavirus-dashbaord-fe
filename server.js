const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

// force https
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);
//compress all responses
app.use(compression());
// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/uk-covid-dashboard/browser'));
// route all get requests through index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/uk-covid-dashboard/browser/index.html'));
});
// Heroku port
app.listen(process.env.PORT || 4200);