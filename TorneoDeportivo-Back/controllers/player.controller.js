'use strict'

var Player = require('../models/player.model.js');


function createPlayers(req, res){
    var player = new Player();
    var params = req.body;

    if(params.name && params.lastname && params.dorsal && params.position){
        Player.findOne({name : params.name, lastname : params.lastname, dorsal : params.dorsal}, (err, playerFind)=>{
            if(err){
                return res.status(500).send({message: 'Erro general en el servidor'});
            }else if(playerFind){
                return res.send({message: 'Jugador ya existente'});
            }else{
                        player.name = params.name;
                        player.lastname = params.lastname;
                        player.dorsal = params.dorsal;
                        player.position = params.position;

                        player.save((err, playerSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general en el servidor'});
                            }else if(playerSaved){
                                return res.send({message: 'Jugador creado exitosamente', playerSaved});
                            }else{
                                return res.status(500).send({message: 'No se pudo guardar este registro'});
                            }
                        })
            }        
        })    
    }else{
        return res.status(403).send({message: 'Por favor. Ingresa los datos obligatorios'});
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
            return res.status(500).send({message: 'No tienes permiso para actualizar estos datos'});
    }
}



module.exports = {
    createPlayers,
    updatePlayer,
    removePlayer,
    updateMatchPlayer
}