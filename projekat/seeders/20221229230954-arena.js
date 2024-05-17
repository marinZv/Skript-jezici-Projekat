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

    await queryInterface.bulkInsert('Arenas', 
    [
      {id:'1', locationID: '1', arenaName: 'Stark Arena', capacity: '18000'},
      {id:'2', locationID: '1', arenaName: 'Hala Pionir', capacity: '8000'},
      {id:'3', locationID: '2', arenaName: 'Spens', capacity: '10000'},
      {id:'4', locationID: '3', arenaName: 'Zivojina Misica', capacity: '5000'},
      {id:'5', locationID: '4', arenaName: 'Megasport', capacity: '20000'},
      {id:'6', locationID: '5', arenaName: 'Yubileyny', capacity: '15000'},
      {id:'7', locationID: '6', arenaName: 'Madison square garden', capacity: '25000'},
      {id:'8', locationID: '7', arenaName: 'Morgan Park', capacity: '22000'},
      {id:'9', locationID: '8', arenaName: 'Los Angeles Momorial Sports Arena', capacity: '16000'},
      {id:'10', locationID: '9', arenaName: 'Be Arena', capacity: '4000'},
      {id:'11', locationID: '10', arenaName: 'Charle De Gol', capacity: '6000'},
      {id:'12', locationID: '11', arenaName: 'Taykan Sports', capacity: '19000'},
      {id:'13', locationID: '12', arenaName: 'Alianz', capacity: '18000'},
      {id:'14', locationID: '13', arenaName: 'Gotte', capacity: '9000'},
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
