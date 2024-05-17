const express = require("express");
const {sequelize, Match} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {matchSchemaPost, matchSchemaPut} = require("../validation_schema");


const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const matches = await Match.findAll();
        return res.json(matches);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }


});


route.get("/:id", async (req, res) => {

    try{
        const match = await Match.findByPk(req.params.id);
        return res.json(match);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {
   
    try{
        
        const {error, succ} = matchSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newMatch = await Match.create(req.body);
        res.json(newMatch);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = matchSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const match = await Match.findByPk(req.params.id);
        match.refereeName = req.body.refereeName;
        match.competitionID = req.body.competitionID;
        match.arenaID = req.body.arenaID;

        await match.save();
        
        return res.json(match);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const match = await Match.findByPk(req.params.id);
        await match.destroy();
        return res.json(match);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;


