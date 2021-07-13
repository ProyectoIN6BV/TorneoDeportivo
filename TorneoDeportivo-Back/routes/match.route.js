'use strict'

var express = require('express');
var matchController = require('../controllers/match.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();


api.post("/createMatch/:id",matchController.createMatch);
api.put('/removeMatch/:id', matchController.removeMatch); //Eliinar un jugador.
api.put('/setPoint/:id',matchController.setPoint); //Update de factura para object id de servicios

module.exports = api;