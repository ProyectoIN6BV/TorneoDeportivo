'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = Schema({
    playersOne: [{type: Schema.ObjectId, ref: 'player'}],
    playersSecond: [{type: Schema.ObjectId, ref: 'player'}],
    goalsFirst: Number,
    goalsSecond:Number,
    foulOne: Number,
    foulSecond: Number
})

module.exports = mongoose.model('match', matchSchema);