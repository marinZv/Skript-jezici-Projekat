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
    await queryInterface.bulkInsert('OrderItems',
    [
      {id:'1', quantity: "2", orderID: '1'},
      {id:'2', quantity: "3", orderID: '2'},
      {id:'3', quantity: "5", orderID: '3'},
      {id:'4', quantity: "1", orderID: '4'},
      {id:'5', quantity: "6", orderID: '5'},
      {id:'6', quantity: "7", orderID: '6'},
      {id:'7', quantity: "2", orderID: '7'},
      {id:'8', quantity: "3", orderID: '8'},
      {id:'9', quantity: "5", orderID: '9'},
      {id:'10', quantity: "1", orderID: '10'},
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
