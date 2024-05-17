const express = require("express");
const {sequelize, TeamMember} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {teamMemberSchemaPost, teamMemberSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const teamMembers = await TeamMember.findAll();
        return res.json(teamMembers);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const teamMember = await TeamMember.findByPk(req.params.id);
        return res.json(teamMember);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = teamMemberSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newTeamMember = await TeamMember.create(req.body);
        res.json(newTeamMember);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
    try{

        const {error, succ} = teamMemberSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const teamMember = await TeamMember.findByPk(req.params.id);
        teamMember.teamMemberName = req.body.teamMemberName;
        teamMember.teamRole = req.body.teamRole;
        teamMember.trophiesNumber = req.body.trophiesNumber;
        teamMember.countryID = req.body.countryID;
        teamMember.clubID = req.body.clubID;
        
        await teamMember.save();
        
        return res.json(teamMember);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});


route.delete('/:id', async (req, res) => {

    try{
        const teamMember = await TeamMember.findByPk(req.params.id);
        await teamMember.destroy();
        return res.json(teamMember);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

