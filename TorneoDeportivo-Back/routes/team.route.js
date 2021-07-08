'use strict'

var express = require('express');
var teamController = require('../controllers/team.controller');

var api = express.Router();

api.post('/createTeam', teamController.createTeam); //Guardar un jugador.

module.exports = api;