'use strict';

var mongoose = require('mongoose');

var Artist = mongoose.Schema({
	name: String,
	description: String,
	image: String,
	artistID: Number
});

module.exports = mongoose.model('Artist', Artist, 'artist');
