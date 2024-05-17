const express = require("express");
const {sequelize, OrderItem} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {orderItemSchemaPost, orderItemSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const orderItems = await OrderItem.findAll();
        return res.json(orderItems);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const orderItem = await OrderItem.findByPk(req.params.id);
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = orderItemSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newOrderItem = await OrderItem.create(req.body);
        res.json(newOrderItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = orderItemSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const orderItem = await OrderItem.findByPk(req.params.id);
        orderItem.quantity = req.body.quantity;
        orderItem.orderID = req.body.orderID;
    
        await orderItem.save();
        
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});


route.delete('/:id', async (req, res) => {

    try{
        const orderItem = await OrderItem.findByPk(req.params.id);
        await orderItem.destroy();
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

