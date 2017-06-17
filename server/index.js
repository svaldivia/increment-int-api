const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');


// Connect to MongoDB
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/inc-int';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.set('port', (process.env.PORT || 5000));

app.set('appPath',__dirname.replace('server', '') + 'app');

app.use(express.static(app.get('appPath')));
app.use(bodyParser.json());

// Routes
require('./routes')(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
