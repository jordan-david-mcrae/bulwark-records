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
  var Landing = require('../models/schema/landing');

  router.use(function (req, res, next) {
    console.info('Landing Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Signup related
  router.get('/', getPreferences);
  router.post('/update', updateLandingPreferences);

  function getLandingPreferences () {
  	return Landing.find();
  }

  function getPreferences (req, res) {
  	// Initial seed
    // var landing = new Landing({
   //  	landingType: 'default', 
   //  	promoVideo: '',
   //  	landingID: 0 
   //  });
  	// landing.save();

	getLandingPreferences()
	  	.exec()
          .then(function success(info) {
            res.status(201)
              .json({
                code: 201,
                title: 'Landing Preferences successfully Retrieved',
                detail: 'Landing info has been retrieved successfully.',
                info: info
              });
            res.end();
          }, function err (response) {
            error();
          });
  }

  function updateLandingPreferences (req, res) {
	var conditions = { landingID: 0 };
	var update = { $set: { landingType: req.body.landingType, promoVideo: req.body.promoVideo }}; 

	console.log('Updating... ', req.body);

	Landing.findOneAndUpdate(conditions, update, function(err, doc) {
	  if (err) {
	    error(res);
	  } else {
	    getLandingPreferences()
	      .exec()
	      .then(function success(info) {
	        res.status(201)
	          .json({
	            code: 201,
	            title: 'Landing Page Updated',
	            detail: 'Landing page has been updated successfully.',
	            info: info
	          });
	        res.end();
	      }, function err (response) {
	        error(res);
	      });
      }
    });
	}

  function error (res) {
    res.status(500)
      .json({
        code: 500,
        title: 'Internal Error',
        detail: 'There was an internal error while retrieving site info. Please try again later.'
      });
      res.end();
  }

  module.exports = router;
}());
