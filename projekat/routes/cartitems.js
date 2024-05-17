const express = require("express");
const {sequelize, CartItem} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {cartItemSchemaPost, cartItemSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {
   
    try{
        const cartItems = await CartItem.findAll();
        return res.json(cartItems); 
    }catch(err){
        res.status(500).json({error: "Greska", body: err});
    }

});


route.get("/:id", async (req, res) => {

    try{
        const cartItem = await CartItem.findByPk(req.params.id);
        return res.json(cartItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {
   
    try{

        const {error, succ} = cartItemSchemaPost.validate(req.body);

        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme"});
            return;
        }

        const newCartItem = await CartItem.create(req.body);
        res.json(newCartItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/:id', async (req, res) => {
    
    try{

        const {error, succ} = cartItemSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme"});
            return;
        }

        const cartItem = await CartItem.findByPk(req.params.id);
        
        cartItem.cartID = req.body.cartID;

        await cartItem.save();
        return res.json(cartItem);

    }catch(err){
        console.log(cartItem);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/:id', async (req, res) => {

    try{
        const cartItem = await CartItem.findByPk(req.params.id);
        await cartItem.destroy();
        return res.json(cartItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

