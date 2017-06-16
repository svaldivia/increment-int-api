const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const User = require('./models/user.model');
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

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes
require('./routes')(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
