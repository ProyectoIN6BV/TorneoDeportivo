'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = Schema({
   name: String,
   description: String,
   date: Date,
   matchs: [{type: Schema.ObjectId, ref: 'match'}],
})

module.exports = mongoose.model('session', sessionSchema);