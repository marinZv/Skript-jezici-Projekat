const express = require("express");
const {sequelize, Order} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {orderSchemaPost, orderSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));


route.get("/", async (req, res) => {

    try{
        const orders = await Order.findAll();
        return res.json(orders);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const order = await Order.findByPk(req.params.id);
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = orderSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newOrder = await Order.create(req.body);
        res.json(newOrder);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = orderSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const order = await Order.findByPk(req.params.id);
        order.deliveringType = req.body.deliveringType;
        order.postCode = req.body.postCode;
        order.paymentID = req.body.paymentID;
        
        await order.save();
        
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {
    
    try{
        const order = await Order.findByPk(req.params.id);
        await order.destroy();
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

