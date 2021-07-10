'use strict'

var express = require('express');
var leagueController = require('../controllers/league.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post ('/saveLeague', leagueController.saveLeague);
api.put('/updateLeague/:id', leagueController.updateLeague);
api.put('removeLeague', leagueController.removeLeague);
api.put('/:id/uploadLeague', leagueController.uploadLeague);
api.post ('/findLeague', leagueController.findLeague);



module.exports = api;