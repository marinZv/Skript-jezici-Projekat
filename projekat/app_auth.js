const express = require('express');
const {sequelize, User} = require("./models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: '*',
    optionSuccesStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    
    const obj = {
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        roleID: req.body.roleID
    }

    User.create(obj).then(rows => {
        const user = {
            userID: rows.id,
            userName: rows.userName
        }

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);

        res.json({token: token});

    }).catch(err => res.status(500).json(err));

});

app.post('/login', (req, res) => {


    console.log(req.body.userName);

    User.findOne({where: {userName: req.body.userName}})
        .then(user => { 

            if(bcrypt.compareSync(req.body.password, user.password)){
                const obj = {
                    userID: user.id,
                    userName: user.userName
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({token: token});
            }else{
                res.status(400).json({msg: "Invalid credentials"});
            }
        }).catch(err => {console.log(err); res.status(500).json(err)});


});

app.listen({port: 9000}, async () => {
    await sequelize.authenticate();
});