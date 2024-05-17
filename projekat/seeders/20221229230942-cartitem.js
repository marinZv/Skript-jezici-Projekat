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
   
    await queryInterface.bulkInsert('CartItems',
    [
      {id:'1', cartID: '1'},
      {id:'2', cartID: '2'},
      {id:'3', cartID: '3'},
      {id:'4', cartID: '4'},
      {id:'5', cartID: '5'},
      {id:'6', cartID: '6'},
      {id:'7', cartID: '7'},
      {id:'8', cartID: '8'},
      {id:'9', cartID: '9'},
      {id:'10', cartID: '10'},
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
