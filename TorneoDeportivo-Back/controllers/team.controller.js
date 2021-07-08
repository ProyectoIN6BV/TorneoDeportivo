'use strict'

var Player = require('../models/player.model.js');
var Team = require('../models/team.model.js');


function createTeam(req, res){
    var team = new Teams();
    var params = req.body;

    if(params.name &&  params.logo &&  params.points){
        Team.findOne({name : params.name}, (err, teamsFind)=>{
            if(err){
                return res.status(500).send({message: 'Erro general en el servidor'});
            }else if(teamsFind){
                return res.send({message: 'Nombre de equipo ya en uso'});
            }else{
                
                team.name = params.name;
                team.logo = params.logo;
                team.points = params.points;

                team.save((err, teamsSaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Erro general en el servidor'});
                    }else if(teamsSaved){
                        return res.send({message: 'Equipo creado exitosamente', teamsSaved});
                    }else{
                        return res.status(500).send({message: 'No se guardó el equipo'});
                    }
                })
            }
        })
    }else{
        return res.status(403).send({message: 'Por favor. Ingresa los datos obligatorios'});
    }
}



module.exports = {
    createTeam
}