'use strict'


var Match = require('../models/match.model');
var League = require('../models/league.model');
var Session = require('../models/session.model');

var Team = require('../models/team.model');
var robin = require('roundrobin');
var moment = require('moment');

function createMatch(req,res){
    var leagueId = req.params.id;
    let teamsLength = "";
    let teams = [];
    var params = req.body; //Pedir el numero de jornadas

    League.findById(leagueId, (err, leagueFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general'});
        }else if(leagueFind){

            teamsLength = Object.keys(leagueFind.teams).length;
            let p1 = ((teamsLength*(teamsLength-1))/2)/(teamsLength-1);
            let j1 = teamsLength-1;
    
           for (let i = 0; i < teamsLength; i++) {

               teams[i] = leagueFind.teams[i]; 
               console.log(teams[i]);
           }

            const robinMatches = robin(teamsLength, teams);                        

             //vacio = todas las jornadas;
             //[0] = una jornada en especifico; j1
             //[0][0] = un partido en especifico; p1
             //[0][0][0] = objectId de equipos; 0 o 1
            // generar jornadas nuevas cada vez que se ejecute esta funcion.
            var date = moment(params.date).format('YYYY-MM-DD');

             for (let jornada = 0; jornada < j1; jornada++) {

                var session = new Session();

                var dateSumado =  moment(date).add(8, 'days').unix();
                                            
                var dateSession =  moment(date).add(8, 'days').unix();

                session.name = "Jornada " + jornada;
                session.dateFirst = dateSumado;
                session.dateSecond = dateSession;

                session.save((err, sessionSaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(sessionSaved){
                        League.findByIdAndUpdate(leagueId, {$push:{sessions: sessionSaved._id}}, {new: true}, (err, pushLeague)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general'});
                            }else if(pushLeague){
                                for (let partido = 0; partido < p1; partido++) {

                                    var match = new Match();
                
                                    match.playersOne = robinMatches[jornada][partido][0];
                                    match.playersSecond = robinMatches[jornada][partido][1];                    
                                    match.date = dateSumado;
                
                                    match.save((err, matchSaved)=>{
                                        if(err){
                                            return res.status(500).send({message: 'Error general'});
                                        }else if(matchSaved){                                        
                                            Session.findByIdAndUpdate(sessionSaved._id, {$push:{matchs: matchSaved._id}}, {new: true}, (err, pushSession)=>{
                                                if(err){
                                                    return res.status(500).send({message: 'Error general'})
                                                }else if(pushSession){
        
                                                }else{
                                                    return res.status(404).send({message: 'Error al settear match'})
                                                }
                                            });        
                                        }else{
                                            return res.status(500).send({message: 'Error general al generar los partidos'});
                                        }
                                    })
                                }
                            }else{
                                return res.status(404).send({message: 'Error al settear liga'})
                            }
                        });
                    }else{
                        return res.status(404).send({message: 'Error al crear la jornada'});
                    }
                })
             }
             return res.send({message: 'Jornadas generadas exitosamente'});
        }else{
            return res.status(402).send({message: 'No se encontro ningun registro'});
        }
    });
}


module.exports = {
    createMatch
}
