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
  var Info = require('../models/schema/info');

  router.use(function (req, res, next) {
    console.info('Info Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Blog related
  router.get('/', getInfo);
  router.post('/update-label', updateLabel);
  router.post('/update-prospective', updateProspective);
  router.post('/update-general', updateGeneral);

  function getInfo (req, res) {
  	Info.find()
  		.exec()
  		.then(function success(allInfo) {
  			if (allInfo !== null) {
  				res.status(201)
  					.json({
  						code: 201,
  						title: 'Successful Info Retrieval',
  						detail: 'Information has been retrieved successfully.',
  						info: allInfo
  					});
				res.end();
  			} else {
  				res.status(500)
  					.json({
  						code: 500,
  						title: 'No Info',
  						detail: 'No information can be retrieved at this time.'
  					});
				res.end();
  			}
  		}, function err (response) {
			error(res);
		});
  }

  function updateLabel (req, res) {
  	// Initial seed
   //  var info = new Info({
   //  	aboutLabel: '', 
   //  	contactProspective: '', 
   //  	contactGeneral: '', 
   //  	infoID: 0
   //  });
  	// info.save(); 
    	var conditions = { infoID: 0 };
    	var update = { $set: { aboutLabel: req.body.html }}; 

      Info.findOneAndUpdate(conditions, update, function(err, doc) {
      if (err) {
        error(res);
      } else {
        getAllInfo()
          .exec()
          .then(function success(info) {
            res.status(201)
              .json({
                code: 201,
                title: 'Successful Info Updated',
                detail: 'Label info has been updated successfully.',
                info: info
              });
            res.end();
          }, function err (response) {
            error();
          });
      }
    });
    }

  function updateProspective (req, res) {
    var conditions = { infoID: 0 };
    var update = { $set: { contactProspective: req.body.html }}; 

    Info.findOneAndUpdate(conditions, update, function(err, doc) {
      if (err) {
        error(res);
      } else {
        getAllInfo()
          .exec()
          .then(function success(info) {
            res.status(201)
              .json({
                code: 201,
                title: 'Successful Info Updated',
                detail: 'Label info has been updated successfully.',
                info: info
              });
            res.end();
          }, function err (response) {
            error();
          });
      }
    });
  }

  function updateGeneral (req, res) {
    var conditions = { infoID: 0 };
    var update = { $set: { contactGeneral: req.body.html }};

    Info.findOneAndUpdate(conditions, update, function(err, doc) {
      if (err) {
        error(res);
      } else {
        getAllInfo()
          .exec()
          .then(function success(info) {
            res.status(201)
              .json({
                code: 201,
                title: 'Successful Info Updated',
                detail: 'Label info has been updated successfully.',
                info: info
              });
            res.end();
          }, function err (response) {
            error();
          });
      }
    });
  }


  function getAllInfo () {
  	return Info.find();
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
