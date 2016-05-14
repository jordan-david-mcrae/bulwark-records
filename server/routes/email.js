'use strict';

(function () {

  //3rd party
  var express = require('express');
  var router = express.Router();
  var nodemailer = require('nodemailer');
  var fs = require('fs');
  var multer = require('multer');
  var config = require('../config');
  var smtp = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword
    }
  };
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  var transporter = nodemailer.createTransport(smtp);
  var hasAttachments = false;
  var attachmentInfo = [];

  var upload = multer({ storage: storage }).single('file');

  //Models

  router.use(function (req, res, next) {
    console.info('Email Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Email related
  router.post('/contact', contactRequest);
  router.post('/upload-file', uploadAttachment);

  function contactRequest (req, res) {
    var attachments = [];
    if (attachmentInfo.length > 0) {
      for (var i=0; i<attachmentInfo.length; i++) {
        console.log('ATTACHMENT INFO: ', attachmentInfo[i]);
        var constructor = {
          filename: '',
          path: ''
        }
        constructor.filename = attachmentInfo[i].originalname;
        constructor.path = './uploads/' + attachmentInfo[i].originalname;
        attachments.push(constructor);
      }
    }
    var mailOptions = {
        from: '"Bulwark Forwarder" <bulwark-forwarder@hotmail.com>', // sender address
        to: 'jordanmcrae@hotmail.com', // list of receivers
        subject: 'New Message Via bulwarkrecords.com (From: ' +req.body.email + ')', // Subject line
        text: 'Email: ' + req.body.email + ' Name: ' + req.body.name + ' Phone: ' + req.body.phone + ' Details: ' + req.body.about, // plaintext body
        html: '<h3>Name: </h3>' + '<h3 style="font-weight: bold">' + req.body.name + '</h3>'
              + '<br>' + '<h3>Type of Inquiry: </h3>' + '<h3 style=font-weight: bold">' + req.body.messageType + '</h3>'
              + '<br>' + '<h3>Email: </h3>' + '<h3 style="font-weight: bold">' + req.body.email + '</h3>'
              + '<br>' + '<h3>Phone: </h3>' + '<h3 style="font-weight: bold">' + req.body.phone + '</h3>'
              + '<br>' + '<h3>Details: </h3>' + '<h3 style="font-weight: bold">' + req.body.about + '</h3>',// html body,
        attachments: attachments
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        res.status(400).json({
          message: 'Your message could not be sent. Please try again.',
        });
      } else {
        res.status(200).json({
          message: 'Your message has been sent. Thank you for contacting us.'
        });
      }
      for (var i=0; i<attachmentInfo.length; i++) {
        var path = './uploads/' + attachmentInfo[i].originalname;
        fs.unlinkSync(path);
      }
        attachmentInfo = [];
        hasAttachments = false;
    });
  };

  // File upload...

  function uploadAttachment (req, res) {
    upload(req, res, function (err) {
      if (err) {
        error(res);
      } else {
        hasAttachments = true;
        attachmentInfo.push(req.file);

        res.status(200).json({
          message: 'Your file has been successfully uploaded.'
        });
      }
    })
  }

  function error (res) {
    res.status(500)
      .json({
        code: 500,
        title: 'Internal Error',
        detail: 'There was an internal error with the email service. Please try again later.'
      });
      res.end();
  }

  module.exports = router;
}());
