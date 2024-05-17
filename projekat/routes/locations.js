const express = require("express");
const {sequelize, Location} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {locationSchemaPost, locationSchemaPut} = require("../validation_schema");

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
        const locations = await Location.findAll();
        return res.json(locations);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});

route.get("/:id", async (req, res) => {

    try{
        const location = await Location.findByPk(req.params.id);
        return res.json(location);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = locationSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newLocation = await Location.create(req.body);
        res.json(newLocation);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.put("/:id", async (req, res) => {

    try{

        const {error, succ} = locationSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const location = await Location.findByPk(req.params.id);
        location.locationName = req.body.locationName;
        location.locationPopulation = req.body.locationPopulation;
        location.countryID = req.body.countryID;
        
        await location.save();
        
        return res.json(location);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.delete("/:id", async (req, res) => {
    
    try{
        const location = await Location.findByPk(req.params.id);
        await location.destroy();
        return res.json(location);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;