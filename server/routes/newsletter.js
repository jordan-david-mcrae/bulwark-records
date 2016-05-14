'use strict';

(function () {

  //3rd party
  var express = require('express');
  var router = express.Router();

  //Models
  var Newsletter = require('../models/schema/newsletter');

  router.use(function (req, res, next) {
    console.info('Newsletter Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Signup related
  router.post('/', newRegistration);

  function newRegistration (req, res) {
    if (req.body!== undefined) {
      if (req.body.email !== undefined) {
        getEmail(req.body.email)
        .exec()
        .then(function success(emailFound) {
          if (emailFound === null) {
            register(req, res)
          } else {
            res.status(403)
              .json({
                code: 403,
                title: 'Already Registered',
                detail: 'The email you provided is already registered.'
              });
              res.end();
          }
        }, function err(response) {
          res.status(500)
            .json({
              code: 500,
              title: 'Interal Error',
              detail: 'There was an error while signing up. Please try again later.'
            });
            res.end();
        });
      }
    }
  };

  function getEmail(emailRequest) {
    return Newsletter.findOne({
      email: emailRequest
    });
  }

  function register(req, res) {
    var signUp = new Newsletter({
      email: req.body.email,
      country: req.body.country,
      postal: req.body.postal,
      optIn: req.body.artistContact
    });

    signUp.save(function(err) {
      if (err) {
        res.status(500)
          .json({
            code: 500,
            title: 'Internal Error',
            detail: 'There was an error while signing up. Please try again later.'
          });
        res.end();
      }
    })
    .then(function (newsletterSaves) {
      res.status(201)
        .json({
          code: 201,
          title: 'Successful Signup',
          detail: 'You have successfully signed up for the newsletter.'
        })
      res.end();
    });
  }


  module.exports = router;
}());
