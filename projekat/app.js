const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// const {sequelize, User} = require("./models");

require('dotenv').config();

const app = express();

function getCookies(req){

    if(req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split("; ");
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
}

function authToken(req, res, next){

    const cookies = getCookies(req);
    const token = cookies['token'];

    if(token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301, '/login');

        req.user = user;

        next();
    });

}

app.use(express.static(path.join(__dirname, 'static')));


app.get("/admin", authToken, (req,res) => {
    res.sendFile(path.join(__dirname), 'static', 'admin_page.html');
});

app.get("/admin/carts", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'cart.html'));
});

app.get("/admin/cartItems", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'cartitem.html'));
});

app.get("/admin/orders", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'order.html'));
});

app.get("/admin/orderItems", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'orderitem.html'));
});

app.get("/admin/matches", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'match.html'));
});

app.get("/admin/locations", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'location.html'));
});

app.get("/admin/countries", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'country.html'));
});

app.get("/admin/users", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'user.html'));
});

app.get("/admin/roles", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'role.html'));
});

app.get("/admin/clubs", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'club.html'));
});

app.get("/admin/competitions", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'competition.html'));
});

app.get("/admin/payments", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'payment.html'));
});

app.get("/admin/teamMembers", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'teammember.html'));
});

app.get("/admin/tickets", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'ticket.html'));
});

app.get("/admin/arenas", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'arena.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});


app.listen({port: 8000}, async () => {
    console.log("Started server on localhost:8000");
});


