'use strict';

var mongoose = require('mongoose');

var User = mongoose.Schema({
	username: String,
	password: String,
	token: String
});

module.exports = mongoose.model('User', User, 'user');
