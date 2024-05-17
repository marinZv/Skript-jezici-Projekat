const express = require("express");
const {sequelize, Ticket} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {ticketSchemaPost, ticketSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));


route.get("/", async (req, res) => {

    try{
        const tickets = await Ticket.findAll();
        return res.json(tickets);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const ticket = await Ticket.findByPk(req.params.id);
        return res.json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = ticketSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newTicket = await Ticket.create(req.body);
        res.json(newTicket);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = ticketSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const ticket = await Ticket.findByPk(req.params.id);
        ticket.price = req.body.price;
        ticket.ticketType = req.body.ticketType;
        ticket.seatNumber = req.body.seatNumber;
        ticket.seatSide = req.body.seatSide;
        ticket.matchID = req.body.matchID;
        ticket.matchID = req.body.orderItemID;
        ticket.matchID = req.body.cartItemID;

        await ticket.save();
        
        return res.json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const ticket = await Ticket.findByPk(req.params.id);
        await ticket.destroy();
        return res.json(ticket);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});

module.exports = route;

