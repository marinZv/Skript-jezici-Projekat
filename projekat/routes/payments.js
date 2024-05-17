const express = require("express");
const {sequelize, Payment} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {paymentSchemaPost, paymentSchemaPut} = require("../validation_schema");

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

route.use(express.json());
route.use(cors(corsOptions));

route.get("/", async (req, res) => {

    try{
        const payments = await Payment.findAll();
        return res.json(payments);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
   
    try{
        const payment = await Payment.findByPk(req.params.id);
        return res.json(payment);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/', async (req, res) => {

    try{
        
        const {error, succ} = paymentSchemaPost.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const newPayment = await Payment.create(req.body);
        res.json(newPayment);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});

route.put('/:id', async (req, res) => {

    try{

        const {error, succ} = paymentSchemaPut.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const payment = await Payment.findByPk(req.params.id);
        payment.cardID = req.body.cardID;
        payment.userID = req.body.userID;
        payment.cardOwner = req.body.cardOwner;
        
        await payment.save();
        
        return res.json(payment);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }


});


route.delete('/:id', async (req, res) => {

    try{
        const payment = await Payment.findByPk(req.params.id);
        await payment.destroy();
        return res.json(payment);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;

