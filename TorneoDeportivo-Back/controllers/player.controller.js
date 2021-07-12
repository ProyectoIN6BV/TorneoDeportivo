'use strict'

var Player = require('../models/player.model.js');
var Teams = require('../models/team.model.js');


function setPlayerToTeam(req, res){
    var teamId = req.params.id;
    var params = req.body;
    var player = new Player();


    if(params.name && params.lastname && params.dorsal && params.position){                
        player.name = params.title;
        player.lastname = params.preferences;
        player.dorsal = params.desc;
        player.position = params.position;

        player.save((err, playerSaved)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(playerSaved){
                Teams.findByIdAndUpdate(teamId, {$push:{players: playerSaved._id}}, {new: true}, (err, pushTeam)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al adjuntar jugador al equipo'});
                    }else if(pushTeam){
                        return res.send({message: 'Jugador creado y agregado', pushTeam, playerSaved});
                    }else{
                        return res.status(404).send({message: 'No se seteo el jugador, pero sí se creó en la BD'});
                    }
                }).populate('players')
            }else{
                return res.status(500).send({message: 'No se guardó el jugador'});
            }
        })
    }else{
        return res.status(401).send({message: 'Por favor envía los datos mínimos para la de tu jugador'})   
    }
}


function updatePlayer(req, res){
    let playerId = req.params.id;
    let update = req.body;

            if(update.name){
                Player.findOne({name: update.name}, (err, playerFind)=>{
                    if(err){
                        return res.status(500).send({ message: 'Error general'});
                    }else if(playerFind){
                        if(playerFind._id == playerId){   
                            Player.findByIdAndUpdate(playerId, update, {new: true}, (err, playerUpdate)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general al actualizar'});
                                }else if(playerUpdate){
                                    return res.send({message: 'Jugador actualizado', playerUpdate});
                                }else{
                                    return res.send({message: 'No se pudo actualizar jugador'});
                                }
                            })
                        }else{
                            return res.send({message: 'Nombre de hotel ya en uso'});    
                        }
                    }else{
                        Player.findByIdAndUpdate(playerId, update, {new: true}, (err, playerUpdate)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al actualizar'});
                            }else if(playerUpdate){
                                return res.send({message: 'Jugador actualizado', playerUpdate});
                            }else{
                                return res.send({message: 'No se pudo actualizar al jugador'});
                            }
                        })
                    }
                })
            }else{
                Player.findByIdAndUpdate(playerId, update, {new: true}, (err, hotelplayerUpdateUpdate)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al actualizar'});
                    }else if(playerUpdate){
                        return res.send({message: 'Hotel actualizado', playerUpdate});
                    }else{
                        return res.send({message: 'No se pudo actualizar al hotel'});
                    }
                })
            }
}


function removePlayer(req, res){
    let playerId = req.params.id;
    
    Player.findByIdAndRemove(playerId, (err, playerFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general'})
        }else if(playerFind){
            return res.send({message: 'Jugador eliminado', playerDrop:playerFind})
        }else{
            return res.status(404).send({message: 'Jugador no encontrado o ya eliminado'})
        }
    })
}


function updateMatchPlayer(req, res){
    let playerId = req.params.id;
    let update = req.body;
        
    if(update.name || update.dorsal || update.lastname || update.position){ 
        return res.status(500).send({message: 'No tienes permiso para actualizar estos datos'});
    }else{            
            Player.findByIdAndUpdate(playerId, update, {new: true}, (err, playerUpdate)=>{
                if(err){
                    return res.status(500).send({message: 'Error general al actualizar'});
                }else if(playerUpdate){
                    return res.send({message: 'Jugador actualizado', playerUpdate});
                }else{
                    return res.send({message: 'No se pudo actualizar jugador'});
                    }
                })
        }
}


module.exports = {
    setPlayerToTeam,
    updatePlayer,
    removePlayer,
    updateMatchPlayer
}