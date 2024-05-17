const express = require("express");
const {sequelize, Cart} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {cartSchemaPost, cartSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const carts = await Cart.findAll();
        return res.json(carts);
    }catch(err){
        console.log(err);
        res.status(500).json();
    }

});


route.get("/:id", async (req, res) => {

    try{
        const cart = await Cart.findByPk(req.params.id);
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {
    
    try{
        
        const {error, succ} = cartSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newCart = await Country.create(req.body);
        res.json(newCart);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

route.put('/:id', async (req, res) => {
   
    try{

        const {error, succ} = cartSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const cart = await Cart.findByPk(req.params.id);
        
        cart.userID = req.body.userID;

        await cart.save();
        
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});


route.delete('/:id', async (req, res) => {
   
    try{
        const cart = await Cart.findByPk(req.params.id);
        await cart.destroy();
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

