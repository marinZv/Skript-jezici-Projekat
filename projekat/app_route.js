const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// const {sequelize, User} = require("./models");

require('dotenv').config();

const app = express();


const locationRoutes = require("./routes/locations.js");
app.use("/admin/location", locationRoutes);

const countryRoutes = require("./routes/countries.js");
app.use("/admin/country", countryRoutes);

const teamMemberRoutes = require("./routes/teammembers.js");
app.use("/admin/teammember", teamMemberRoutes);

const roleRoutes = require("./routes/roles.js");
app.use("/admin/role", roleRoutes);

const userRoutes = require("./routes/users.js");
app.use("/admin/user", userRoutes);

const orderRoutes = require("./routes/orders.js");
app.use("/admin/order", orderRoutes);

const orderItemRoutes = require("./routes/orderitems.js");
app.use("/admin/orderitem", orderItemRoutes);

const cartRoutes = require("./routes/carts.js");
app.use("/admin/cart", cartRoutes);

const cartItemRoutes = require("./routes/cartitems.js");
app.use("/admin/cartitem", cartItemRoutes);

const arenaRoutes = require("./routes/arenas.js");
app.use("/admin/arena", arenaRoutes);

const clubRoutes = require("./routes/clubs.js");
app.use("/admin/club", clubRoutes);

const matchRoutes = require("./routes/matches.js");
app.use("/admin/match", matchRoutes);

const ticketRoutes = require("./routes/tickets.js");
app.use("/admin/ticket", ticketRoutes);

const competitionRoutes = require("./routes/competitions.js");
app.use("/admin/competition", competitionRoutes);

const paymentRoutes = require("./routes/payments.js");
app.use("/admin/payment", paymentRoutes);


app.listen({port: 8090}, async () => {
    console.log("Started server on localhost:8090");
});


