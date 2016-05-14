'use strict';

(function () {

	//3rd party
	var express = require('express');
	var router = express.Router();
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	var app = express();
	var morgan = require('morgan');
	var config = require('../config');
	app.set('secret', config.secret);

	// Config
	var config = require('../config');

	//Models
	var User = require('../models/schema/user');

	router.use(function (req, res, next) {
		console.info('User Service Request -> ' + new Date()
		  .toString() + '> path: ', req.path);
		next();
	});

	//Signup related
	router.post('/login', login);
	router.post('/logout', logout);
	router.post('/register', validateRegister);

	function validateRegister (req, res) {
		if (req.body.username !== undefined && req.body.password !== undefined) {
			findUser(req.body.username)
			.exec()
			.then(function success(matchFound) {
				if (matchFound === null) {
					register(req, res);
				} else {
					res.status(403)
						.json({
							code: 403,
							title: 'Already Registered',
							detail: 'There is already a user registered with that name.'
						});
					res.end();
				}
			}, function error (response) {
				error(res);
			})
		}
	}

	function register(req, res) {
	    var user = new User({
	      username: req.body.username,
	      password: bcrypt.hashSync(req.body.password, 10),
	      token: ''
	    });

	    user.save(function(err) {
	      if (err) {
	        error(res);
	        return;
	      }
	    })
	    .then(function (successUser) {
	    	var token = newToken(successUser);
		  	var conditions = { username: req.body.username };
		  	var update = { $set: { token: '' }}; 
		  	User.update(conditions, update, function(err, numUpdated) {
		  		if (err) {
		  			error(res);
		  		} else {
			      res.status(201)
			        .json({
			          code: 201,
			          title: 'Successful Signup',
			          detail: 'You have successfully registered as an admin.',
			          token: token
			        })
			      res.end();
		  		}
		  	});
		});
	}

  function login (req, res) {
  	if (req.body.username !== undefined && req.body.password !== undefined) {
  		findUser(req.body.username)
  		.exec()
  		.then(function (usernameMatch) {
  			if (usernameMatch !== null) {
  				checkPassword(req, res, usernameMatch);
  			} else {
	  			res.status(403)
			        .json({
			          code: 403,
			          title: 'Not Found',
			          detail: 'The information you provided is invalid.'
			        });
		        res.end();
  			}
  		}, function err () {
  			error(res);
  		});
  	} else {
		res.status(403)
			.json({
			  code: 403,
			  title: 'Not Found',
			  detail: 'The information you provided is invalid.'
			});
		res.end();
  	}
  }

  function checkPassword (req, res, hash) {
  	bcrypt.compare(req.body.password, hash.password, function(err, authenticated) {
  		if (err) {
  			error(res);
  		}
  		if (authenticated) {
  			var token = newToken(hash);
			res.status(200)
		        .json({
		          code: 200,
		          title: 'Success',
		          detail: 'You have successfully logged in.',
		          token: token
		        });
	        res.end();
  		} else {
  			res.status(403)
	        .json({
	          code: 403,
	          title: 'Not Found',
	          detail: 'The information you provided is invalid.',
	          token: null
	        });
	        res.end();
	      }
  	});
  }

  function newToken (user) {
    var token = jwt.sign({
        id: user._id
      }, app.get('secret'), {
        expiresIn: (60 * (60 * 24))
      });
    return token;
  }

  function logout (req, res) {
  	if (req.body.username === '' || req.body.username === null || req.body.username === undefined) {
  		error(res);
  	} else {
	  	var conditions = { username: req.body.username };
	  	var update = { $set: { token: '' }}; 

		User.update(conditions, update, function(err, numUpdated) {
			if (err) {
				error(res);
			} else {
				res.status(200)
			        .json({
			          code: 200,
			          title: 'Success',
			          detail: 'You have successfully logged out.'
			        });
		        res.end();
			}
		});
  	}
  }

  function error (res) {
  	res.status(500)
	    .json({
	      code: 500,
	      title: 'Internal Error',
	      detail: 'There was an internal error while loggin in. Please try again later.'
	    });
	    res.end();
  }

  function findUser (credentials) {
    return User.findOne({
      username: credentials
    });
  }

  module.exports = router;
}());
