'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = Schema({
    matchNumber: String,
    playersOne: [{type: Schema.ObjectId, ref: 'player'}],
    playersSecond: [{type: Schema.ObjectId, ref: 'player'}],
    goalsFirst: Number,
    goalsSecond:Number,
    foulOne: Number,
    foulSecond: Number,
    date: Date
})

module.exports = mongoose.model('match', matchSchema);