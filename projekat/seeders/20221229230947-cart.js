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
   
    await queryInterface.bulkInsert('Carts',
    [
      {id:'1', userID: '1'},
      {id:'2', userID: '2'},
      {id:'3', userID: '3'},
      {id:'4', userID: '4'},
      {id:'5', userID: '5'},
      {id:'6', userID: '1'},
      {id:'7', userID: '2'},
      {id:'8', userID: '3'},
      {id:'9', userID: '4'},
      {id:'10', userID: '5'},
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
