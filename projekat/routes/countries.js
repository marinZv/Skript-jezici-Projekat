const express = require("express");
const {sequelize, Country} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

module.exports = route;

const {countrySchemaPut, countrySchemaPost} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) =>{
    try{
        const countries = await Country.findAll();
        return res.json(countries);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const country = await Country.findByPk(req.params.id);
        return res.json(country);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = countrySchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newCountry = await Country.create(req.body);
        res.json(newCountry);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
   
    try{

        console.log(req.body);

        const {error, succ} = countrySchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const country = await Country.findByPk(req.params.id);
        country.countryName = req.body.countryName;
        country.countryPopulation = req.body.countryPopulation;
        
        await country.save();
        
        return res.json(country);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const country = await Country.findByPk(req.params.id);
        await country.destroy();
        return res.json(country);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});



