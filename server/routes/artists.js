'use strict';

(function () {

  //3rd party
  var express = require('express');
  var router = express.Router();
  var app = express();
  var config = require('../config');
  app.set('secret', config.secret);

  //Models
  var Artist = require('../models/schema/artist');

  router.use(function (req, res, next) {
    console.info('Artist Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  router.get('/', getArtists);
  router.post('/send', artistFlow);

  // Artist related
  function artistFlow (req, res) {
    console.log('REQ BOD: ', req.body);
    checkExists(req.body.artistID)
      .exec()
      .then(function success (exists) {
        if (exists === null) {
          var artist = new Artist({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            artistID: req.body.artistID
          });

          artist.save(function (err) {
            if (err) {
              error(res);
              return;
            }
          })
          .then(function (artistSuccess) {
            console.log('Artist success: ', artistSuccess);
            if (artistSuccess !== null) {
              retrieveAll()
                .exec()
                .then(function success (artists) {
                  console.log('Artists retrieved: ', artists);
                  res.status(201)
                    .json({
                      code: 201,
                      title: 'Artist Creation Success',
                      detail: 'You have successfully added a new artist.',
                      artists: artists
                    });
                  res.end();
                }, function err (response) {
                  error(res);
                })
            } else {
              error(res);
            }
          })
        } else {
          updateArtist(req.body, req, res);
        }
      }, function err (error) {
        error(res);
      });
  }

  function checkExists (id) {
    return Artist.findOne({
      artistID: id
    });
  }

  function updateArtist (artist, req, res) {
    var conditions = { artistID: req.body.artistID };
    var update = { $set: { name: req.body.name, description: req.body.description, image: req.body.image }}; 

    Artist.update(conditions, update, function(err, numUpdated) {
      if (err) {
        res.status(500)
          .json({
            code: 500,
            title: 'Artist Error',
            detail: 'There was an error while updating the artist. Error: ' + err
          });
        res.end();
      } else {
        retrieveAll()
          .exec()
          .then(function success (artists) {
            res.status(201)
              .json({
                code: 201,
                title: 'Successful Artist Update',
                detail: req.body.name + ' has been successfully updated.',
                artists: artists
              })
            res.end();
          }, function err (response) {
            error(res);
          });
      }
    });
  }

  function getArtists (req, res) {
    retrieveAll()
      .exec()
      .then(function success (artists) {
        if (artists !== null) {
          res.status(201)
            .json({
              code: 201,
              title: 'Artists Retrieved',
              detail: 'All artists have been retrieved successfully.',
              artists: artists
            })
          res.end();
        } else {
          res.status(500)
            .json({
              code: 500,
              title: 'Artists Error',
              detail: 'There are currently no artists.'
            });
            res.end();
        }
      }, function err () {
        error(res);
      });
  }

  function retrieveAll () {
    return Artist.find()
  }


  function error (res) {
    res.status(500)
      .json({
        code: 500,
        title: 'Internal Error',
        detail: 'There was an internal error while handling artists. Please try again later.'
      });
      res.end();
  }


  module.exports = router;
}());
