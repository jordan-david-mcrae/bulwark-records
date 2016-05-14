'use strict';

var mongoose = require('mongoose');

var Newsletter = mongoose.Schema({
  email: String,
  country: String,
  postal: String,
  optIn: Boolean
});

module.exports = mongoose.model('Newsletter', Newsletter, 'newsletter');
