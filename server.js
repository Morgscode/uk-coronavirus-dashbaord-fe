const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
//compress all responses
app.use(compression());
// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/uk-covid-dashboard/browser'));
// route all get requests through index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/uk-covid-dashboard/browser/index.html'));
});
// Heroku port
console.log(process.env.PORT);
app.listen(process.env.PORT || 4200);