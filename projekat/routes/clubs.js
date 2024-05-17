const express = require("express");
const {sequelize, Club} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {clubSchemaPost, clubSchemaPut} = require("../validation_schema");

module.exports = route;

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {
   
    try{
        const clubs = await Club.findAll();
        return res.json(clubs);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
   
    try{
        const club = await Club.findByPk(req.params.id);
        return res.json(club);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = clubSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newClub = await Club.create(req.body);
        res.json(newClub);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
    
    try{

        const {error, succ} = clubSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const club = await Club.findByPk(req.params.id);
        club.clubName = req.body.clubName;
        club.clubTrophies = req.body.clubTrophies;
        club.locationID = req.body.locationID;
        club.countryID = req.body.countryID;
        
        await club.save();
        
        return res.json(club);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {
   
    try{
        const club = await Club.findByPk(req.params.id);
        await club.destroy();
        return res.json(club);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});



