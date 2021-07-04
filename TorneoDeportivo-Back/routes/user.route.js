'user strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middlewares/authenticated');


var api = express.Router();

api.post('/login', userController.login); //login de todos los usuarios
api.post ('/saveUser', mdAuth.ensureAuthAdmin,userController.saveUser);
api.put('/updateUser/:id', mdAuth.ensureAuth, userController.updateUser);
//api.put('removeUser', mdAuth.ensureAuth, userController.removeUser);



module.exports = api;