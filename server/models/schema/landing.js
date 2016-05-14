'use strict';

var mongoose = require('mongoose');

var Landing = mongoose.Schema({
	landingType: String,
	promoVideo: String,
	landingID: 0
});

module.exports = mongoose.model('Landing', Landing, 'landing');
