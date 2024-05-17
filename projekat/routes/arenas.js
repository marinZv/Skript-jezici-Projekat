const express = require("express");
const {sequelize, Arena} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {arenaSchemaPost, arenaSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const arenas = Arena.findAll();
        return res.json(arenas);
    }catch(err){
        res.status(500).json({error: "Greska", body: err});
    }
});


route.get("/:id", async (req, res) => {

    try{
        const arena = await Arena.findByPk(req.params.id);
        return res.json(arena);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }     
});

route.post('/', async (req, res) => {

    try{

        const {error, succ} = arenaSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme"});
            return;
        }

        const newArena = await Arena.create(req.body);
        res.json(newArena);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {

    try{
        const {error, succ} = arenaSchemaPut.validate(req.body);
        
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme"});
            return;
        }

        const arena = await Arena.findByPk(req.params.id);
        
        arena.arenaName = req.body.arenaName;
        arena.capacity = req.body.capacity;
        arena.locationID = req.body.locationID;
        
        await arena.save();

        return res.json(arena);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
    
});


route.delete('/:id', async (req, res) => {

    try{
        const arena = await Arena.findByPk(req.params.id);
        await arena.destroy();
        return res.json(arena);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

