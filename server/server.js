'use strict()';

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
// var jsonfile = require('jsonfile');
// var util = require('util');
// var cors = require('cors');
var config = require('./config');
app.set('secret', config.secret);
var hasAttachments = false;
var attachmentInfo = [];

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();

});

//allow cross origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', false);
  next();
});


app.use(function(req, res, next) {
  res.header("X-powered-by", "Bulwark Records");
  next();
});

// MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.11:27017/' + config.dbName);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to Mongo...');
});


// Routes
var newsletterRoutes = require('./routes/newsletter.js');
app.use('/newsletter', newsletterRoutes);
var userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);
var authRoutes = require('./routes/auth.js');
app.use('/auth', authRoutes);
var blogRoutes = require('./routes/blogs.js');
app.use('/blogs', blogRoutes);
var infoRoutes = require('./routes/info.js');
app.use('/info', infoRoutes);
var emailRoutes = require('./routes/email.js');
app.use('/email', emailRoutes);
var landingRoutes = require('./routes/landing.js');
app.use('/landing', landingRoutes);
var artistRoutes = require('./routes/artists.js');
app.use('/artists', artistRoutes);



// start express server
app.set('port', process.env.PORT || 5002);
var server = app.listen(5002, '192.168.0.11', function() {
  var port = server.address().port;
  console.log('Bulwark Records server running on port:' + port);
});
