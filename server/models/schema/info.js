'use strict';

var mongoose = require('mongoose');

var Info = mongoose.Schema({
	aboutLabel: String,
	contactProspective: String,
	contactGeneral: String,
	infoID: 0
});

module.exports = mongoose.model('Info', Info, 'info');
