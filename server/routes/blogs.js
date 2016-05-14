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
  var Blog = require('../models/schema/blog');

  router.use(function (req, res, next) {
    console.info('Blog Service Request -> ' + new Date()
      .toString() + '> path: ', req.path);
    next();
  });

  //Blog related
  router.post('/new', newBlog);
  router.get('/', getBlogs);
  router.post('/delete', deleteBlog);

  function newBlog (req, res) {
    checkExists(req.body.blogID)
      .exec()
      .then(function success (exists) {
        if (exists === null) {
          var blog = new Blog({
            html: req.body.html,
            blogID: req.body.blogID,
            date: new Date()
          });

          blog.save(function (err) {
            if (err) {
              error(res);
              return;
            }
          })
          .then(function (blogSuccess) {
            if (blogSuccess !== null) {
              res.status(201)
                .json({
                  code: 201,
                  title: 'Blog Success',
                  detail: 'Your blog has been successfully posted.'
                });
              res.end();
            } else {
              error(res);
            }
          })
        } else {
          updateBlog(req.body, req, res);
        }
      }, function err (error) {
        error(res);
      });
  }

  function checkExists (id) {
    return Blog.findOne({
      blogID: id
    });
  }

  function updateBlog (blog, req, res) {
    console.log('Updating... ', blog);
    var conditions = { blogID: req.body.blogID };
    var update = { $set: { html: req.body.html, date: new Date() }}; 

    Blog.update(conditions, update, function(err, numUpdated) {
      console.log('Error? ', err);
      if (err) {
        res.status(500)
          .json({
            code: 500,
            title: 'Blog Error',
            detail: 'There was an error while updating your blog. Error: ' + err
          });
        res.end();
      } else {
        res.status(201)
          .json({
            code: 201,
            title: 'Successful Blog Update',
            detail: 'You have successfully update your blog post.'
          })
        res.end();
      }
    });
  }

  function getBlogs (req, res) {
    retrieveAll()
      .exec()
      .then(function success (blogs) {
        if (blogs !== null) {
          res.status(201)
            .json({
              code: 201,
              title: 'Blogs Retrieved',
              detail: 'All blogs have been retrieved successfully.',
              blogs: blogs
            })
          res.end();
        } else {
          res.status(500)
            .json({
              code: 500,
              title: 'Blog Error',
              detail: 'There are currently no blogs.'
            });
            res.end();
        }
      }, function err () {
        error(res);
      });
  }

  function retrieveAll () {
    return Blog.find()
  }

  function deleteBlog (req, res) {
    Blog.remove({ blogID: req.body.blogID}, 1)
      .exec()
      .then(function success (successfulDelete) {
        if (successfulDelete !== null) {
          getBlogs(req, res);
        } else {
          res.status(500)
            .json({
              code: 500,
              title: 'Blog Error',
              detail: 'There was an error while deleting your blog. Error: '
            });
          res.end();
        }
      }, function err (response) {
        error(res);
      });
  }

  function error (res) {
    res.status(500)
      .json({
        code: 500,
        title: 'Internal Error',
        detail: 'There was an internal error while handling blogs. Please try again later.'
      });
      res.end();
  }

  module.exports = router;
}());
