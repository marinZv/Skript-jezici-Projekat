const express = require("express");
const {sequelize, Role} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {roleSchemaPost, roleSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {


    try{
        const roles = await Role.findAll();
        return res.json(roles);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }


});


route.get("/:id", async (req, res) => {
   

    try{
        const role = await Role.findByPk(req.params.id);
        return res.json(role);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = roleSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newRole = await Role.create(req.body);
        res.json(newRole);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
  
    try{

        const {error, succ} = roleSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const role = await Role.findByPk(req.params.id);
        role.roleName = req.body.roleName;
        
        await role.save();
        
        return res.json(role);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const role = await Role.findByPk(req.params.id);
        await role.destroy();
        return res.json(role);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

