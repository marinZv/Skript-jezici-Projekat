'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Payments', 
      [
        {id:'1', userID: '1', cardID: '1', cardOwner: "Veljko Stankovic"},
        {id:'2', userID: '2', cardID: '2', cardOwner: "Stanko Veljkovic"},
        {id:'3', userID: '3', cardID: '3', cardOwner: "Vukasin Ilic"},
        {id:'4', userID: '4', cardID: '4', cardOwner: "Vukasin Bojic"},
        {id:'5', userID: '5', cardID: '5', cardOwner: "Bojan Simic" },
        {id:'6', userID: '1', cardID: '6', cardOwner: "Sima Bojanic"},
        {id:'7', userID: '2', cardID: '7', cardOwner: 'Ana Ilic'},
        {id:'8', userID: '3', cardID: '8', cardOwner: "Eva Ras"},
        {id:'9', userID: '7', cardID: '9',cardOwner: "Ugljesa Erceg"}, 
        {id:'10', userID: '6', cardID: '10', cardOwner: "Zoran Macvan"}
      ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
