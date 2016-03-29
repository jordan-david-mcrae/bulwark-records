'use strict()';

var express = require('express');
var app = express();
var fs = require('fs');
var jsonfile = require('jsonfile');
var util = require('util');
var cors = require('cors');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var file = 'data/blogpost.json';
var htmlfile = 'data/htmlblogs.json';
var sessionId = {
  id: ''
};

var currentHtmlBlogs = '';

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

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


// ********** Blogs

function updateHtmlBlogs(blogs, res) {
  // Pass blogs as string
  fs.writeFile(htmlfile, blogs, function(err) {
    if (err) {
      res.status(513).end();
    } else {
      var data = JSON.parse(fs.readFileSync(htmlfile));
      console.log('DATA: ', JSON.stringify(data));
      currentHtmlBlogs = data;
      res.send(data);
    }
  });
};

app.post('/new-html-entry/', function(req, res) {
  var updatedFile = '';
  var prevData = JSON.parse(fs.readFileSync(htmlfile));
  prevData.push(req.body);

  updateHtmlBlogs(JSON.stringify(prevData), res);
});

app.get('/blogs/', function(req, res) {
  var data = JSON.parse(fs.readFileSync(htmlfile));

  res.send(data);
});

app.post('/delete-blog/', function(req, res) {
  var currentBlogs = JSON.parse(fs.readFileSync(htmlfile));
  var blogArray = [];


  for (var i = 0; i < currentBlogs.length; i++) {
    if (req.body.entry !== currentBlogs[i].entry) {
      blogArray.push(currentBlogs[i]);
    }
  }
  updateHtmlBlogs(JSON.stringify(blogArray), res);
});

// ********** Images
app.post('/upload-image/', upload.array('image', 12), function(req, res) {
  console.log('UPLOAD RECEIVED: ', req.files);
});



// ********** Users

app.post('/login/', function(req, res) {
  console.log('Logging in...');
  if (req.body.login === 'bulwarkadmin' && req.body.password === 'password') {
    sessionId = (Math.random() * 10000000000000000);
    res.status(200).json({
      success: {
        message: 'You have successfully logged in',
        userID: sessionId
      }
    });
  } else {
    res.status(400).json({
      error: {
        message: 'Invalid username or password',
      }
    });
    res.end();
  }
});

app.post('/logout', function(req, res) {
  console.log('Logging out...');
  sessionId = '';
  res.status(200).json({
    success: {
      message: 'You have successfully logged out',
      userID: ''
    }
  });
});

// start express server
app.set('port', process.env.PORT || 5002);
var server = app.listen(5002, 'localhost', function() {
  var port = server.address().port;
  console.log('Bulwark Records server running on port:' + port);
});
