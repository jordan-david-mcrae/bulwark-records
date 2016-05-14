'use strict';

(function () {

  //3rd party
  var express = require('express');
  var jwt = require('jsonwebtoken');
  var router = express.Router();
  var app = express();
  var config = require('../config');
  app.set('secret', config.secret);

  //Models
  var User = require('../models/schema/user');

  router.use(function (req, res, next) {
    console.info('Auth Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Signup related
  router.post('/is-authorized', checkAuth);

  function checkAuth (req, res) {
    if (req.body.token === null || req.body.username === '' || req.body.username === null) {
      res.status(201)
        .json({
          code:201,
          tokenFound: false
        })
      res.end();
    } else {
      jwt.verify(req.body.token, app.get('secret'), function(err) {
        if (err) {
          res.status(201)
            .json({
              code:201,
              tokenFound: false
            })
          res.end();
        } else {
          res.status(201)
            .json({
              code: 201,
              tokenFound: true
            })
          res.end();
        }
      });
    }
  }

  module.exports = router;
}());
