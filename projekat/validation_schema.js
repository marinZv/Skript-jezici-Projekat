const Joi = require('Joi');

const userSchemaPost = Joi.object({
    userName: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(20).required(),
    roleID: Joi.number().integer().min(0).required()
});

const userSchemaPut = Joi.object({
    id: Joi.string().required(),
    userName: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(20).required(),
    roleID: Joi.number().integer().min(0).required()
});

const locationSchemaPost = Joi.object({
    countryID: Joi.number().integer().min(0).required(),
    locationName: Joi.string().min(2).max(30).required(),
    locationPopulation: Joi.number().integer().required()
});

const locationSchemaPut = Joi.object({
    id: Joi.string().required(),
    countryID: Joi.number().integer().min(0).required(),
    locationName: Joi.string().min(2).max(30).required(),
    locationPopulation: Joi.number().integer().required()
});

const countrySchemaPost = Joi.object({
    countryName: Joi.string().min(2).max(30).required(),
    countryPopulation: Joi.number().integer().required()
});

const countrySchemaPut = Joi.object({
    id: Joi.string().required(),
    countryName: Joi.string().min(2).max(30).required(),
    countryPopulation: Joi.number().integer().required()
});

const competitionSchemaPost = Joi.object({
    competitionName: Joi.string().min(2).max(40).required(),
    system: Joi.string().min(3).max(6).required()
});

const competitionSchemaPut = Joi.object({
    id: Joi.string().required(),
    competitionName: Joi.string().min(2).max(40).required(),
    system: Joi.string().min(3).max(6).required()
});

const clubSchemaPost = Joi.object({
    competitionID: Joi.number().integer().min(0).required(),
    locationID: Joi.number().integer().min(0).required(),
    clubName: Joi.string().min(2).max(40).required(),
    clubTrophies: Joi.number().integer().min(0).required()
});

const clubSchemaPut = Joi.object({
    id: Joi.string().required(),
    competitionID: Joi.number().integer().min(0).required(),
    locationID: Joi.number().integer().min(0).required(),
    clubName: Joi.string().min(2).max(40).required(),
    clubTrophies: Joi.number().integer().min(0).required()
});

const ticketSchemaPost = Joi.object({
    cartItemID: Joi.number().integer().min(0).required(), 
    matchID: Joi.number().integer().min(0).required(), 
    price: Joi.number().integer().min(0).required(), 
    ticketType: Joi.string().min(3).max(7).required(), 
    seatNumber: Joi.number().integer().min(0).required(), 
    seatSide: Joi.string().min(4).max(5).required()
});

const ticketSchemaPut = Joi.object({
    id: Joi.string().required(),
    cartItemID: Joi.number().integer().min(0).required(), 
    matchID: Joi.number().integer().min(0).required(), 
    price: Joi.number().integer().min(0).required(), 
    ticketType: Joi.string().min(3).max(7).required(), 
    seatNumber: Joi.number().integer().min(0).required(), 
    seatSide: Joi.string().min(4).max(5).required()
});

const orderItemSchemaPost = Joi.object({
    orderID: Joi.number().integer().min(0).required()
});

const orderItemSchemaPut = Joi.object({
    id: Joi.string().required(),
    orderID: Joi.number().integer().min(0).required()
});

const orderSchemaPost = Joi.object({
    paymentID: Joi.number().integer().min(0).required(), 
    deliveringType: Joi.string().min(6).max(10).required(),
    postCode: Joi.number().integer().min(4).max(8).required()
});

const orderSchemaPut = Joi.object({
    id: Joi.string().required(),
    paymentID: Joi.number().integer().min(0).required(), 
    deliveringType: Joi.string().min(6).max(10).required(),
    postCode: Joi.number().integer().min(4).max(8).required()
});

const paymentSchemaPost = Joi.object({
    userID:  Joi.number().integer().min(0).required(),  
    cardID:  Joi.number().integer().min(0).required(), 
    cardOwner: Joi.string().min(2).max(40).required()
});

const paymentSchemaPut = Joi.object({
    id: Joi.string().required(),
    userID:  Joi.number().integer().min(0).required(),  
    cardID:  Joi.number().integer().min(0).required(), 
    cardOwner: Joi.string().min(2).max(40).required()
});

const matchSchemaPost = Joi.object({
    competitionID: Joi.number().integer().min(0).required(),
    arenaID: Joi.number().integer().min(0).required(),
    refereeName: Joi.string().min(2).max(40).required()
});

const matchSchemaPut = Joi.object({
    id: Joi.string().required(),
    competitionID: Joi.number().integer().min(0).required(),
    arenaID: Joi.number().integer().min(0).required(),
    refereeName: Joi.string().min(2).max(40).required()
});

const cartSchemaPost = Joi.object({
    userID: Joi.number().integer().min(0).required()
});

const cartSchemaPut = Joi.object({
    id: Joi.string().required(),
    userID: Joi.number().integer().min(0).required()
});

const cartItemSchemaPost = Joi.object({
    cartID: Joi.number().integer().min(0).required()
});

const cartItemSchemaPut = Joi.object({
    id: Joi.string().required(),
    cartID: Joi.number().integer().min(0).required()
});

const arenaSchemaPost = Joi.object({
    locationID: Joi.number().integer().min(0).required(),
    arenaName: Joi.string().min(2).max(40).required(), 
    capacity: Joi.number().integer().required()
});

const arenaSchemaPut = Joi.object({
    id: Joi.string().required(),
    locationID: Joi.number().integer().min(0).required(),
    arenaName: Joi.string().min(2).max(40).required(), 
    capacity: Joi.number().integer().required()
});

const roleSchemaPost = Joi.object({
    roleName: Joi.string().min(2).max(40).required()
});

const roleSchemaPut = Joi.object({
    id: Joi.string().required(),
    roleName: Joi.string().min(2).max(40).required()
});

const teamMemberSchemaPost = Joi.object({
    clubID: Joi.number().integer().min(0).required(),
    countryID: Joi.number().integer().min(0).required(), 
    teamRole: Joi.string().min(2).max(20).required(),
    teamMemberName: Joi.string().min(2).max(40).required(), 
    trophiesNumber: Joi.number().integer().required()
});

const teamMemberSchemaPut = Joi.object({
    clubID: Joi.number().integer().min(0).required(),
    countryID: Joi.number().integer().min(0).required(), 
    teamRole: Joi.string().min(2).max(20).required(),
    teamMemberName: Joi.string().min(2).max(40).required(), 
    trophiesNumber: Joi.number().integer().required()
});


module.exports = {
    userSchemaPost,
    userSchemaPut,
    locationSchemaPost,
    locationSchemaPut,
    countrySchemaPost,
    countrySchemaPut,
    competitionSchemaPost,
    competitionSchemaPut,
    clubSchemaPost,
    clubSchemaPut,
    ticketSchemaPost,
    ticketSchemaPut,
    orderItemSchemaPost,
    orderItemSchemaPut,
    orderSchemaPost,
    orderSchemaPut,
    paymentSchemaPost,
    paymentSchemaPut,
    matchSchemaPost,
    matchSchemaPut,
    cartSchemaPost,
    cartSchemaPut,
    cartItemSchemaPost,
    cartItemSchemaPut,
    arenaSchemaPost,
    arenaSchemaPut,
    roleSchemaPost,
    roleSchemaPut,
    teamMemberSchemaPost,
    teamMemberSchemaPut
}