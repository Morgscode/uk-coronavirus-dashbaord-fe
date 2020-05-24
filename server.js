const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/uk-covid-dashboard/browser'));
// Start the app by listening on the default
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/uk-covid-dashboard/browser/index.html.gz'));
});
// Heroku port
app.listen(process.env.PORT || 4200);