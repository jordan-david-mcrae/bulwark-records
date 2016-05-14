'use strict';

var mongoose = require('mongoose');

var Blog = mongoose.Schema({
	html: String,
	blogID: String,
	date: String
});

module.exports = mongoose.model('Blog', Blog, 'blog');
