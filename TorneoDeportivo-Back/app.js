'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');
var playerRoute = require('./routes/player.route');

var api = express();

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


api.use('/torneo', userRoute);
api.use('/torneo', playerRoute);


module.exports = api;