'use strict'

var Match = require('../models/match.model');
var League = require('../models/league.model');
var Team = require('../models/team.model');

var fs = require('fs');
var path = require('path');

function createMatch(req,res){
    var leagueId = req.params.id;
    let teamsLength = "";
    let teams = [];
    JSONArray teams = [];

    League.findById(leagueId, (err, leagueFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general'})
        }else if(leagueFind){

            teamsLength = Object.keys(leagueFind.teams).length;
            
            for (let i = 0; i < teamsLength ; i++) {

                teams[i] = leagueFind.teams;

                console.log(teams[i]);
            }
              

        }else{
            return res.status(404).send({message: 'No hay registros'})
        }
    }).populate("teams");
    
}

module.exports = {
    createMatch
}
