const express = require("express");
const {sequelize, Competition} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {competitionSchemaPost, competitionSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const competition = await Competition.findAll();
        return res.json(competition);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const competition = await Competition.findByPk(req.params.id);
        return res.json(competition);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {
    
    try{
        
        const {error, succ} = competitionSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newCompetition = await Competition.create(req.body);
        res.json(newCompetition);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
    
    try{

        const {error, succ} = competitionSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const competition = await Competition.findByPk(req.params.id);
        competition.competitionName = req.body.competitionName;
        competition.system = req.body.system;
        
        await competition.save();
        
        return res.json(competition);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const competition = await Competition.findByPk(req.params.id);
        await competition.destroy();
        return res.json(competition);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

