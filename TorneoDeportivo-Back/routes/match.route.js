'use strict'

var express = require('express');
var matchController = require('../controllers/match.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();


module.exports = api;