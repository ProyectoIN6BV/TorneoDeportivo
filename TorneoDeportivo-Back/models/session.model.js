'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = Schema({
   name: String,    
   dateFirst: Date, 
   dateSecond: Date, 
   matchs: [{type: Schema.ObjectId, ref: 'match'}],
})

module.exports = mongoose.model('session', sessionSchema);