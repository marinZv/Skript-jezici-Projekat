const express = require("express");
const {sequelize, User} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {userSchemaPost, userSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));


route.get("/", async (req, res) => {

    try{
        const users = await User.findAll();
        return res.json(users);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const user = await User.findByPk(req.params.id);
        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = userSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newUser = await User.create(req.body);
        res.json(newUser);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = userSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const user = await User.findByPk(req.params.id);
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.roleID = req.body.roleID;
        
        await user.save();
        
        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

