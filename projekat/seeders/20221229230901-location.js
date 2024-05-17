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
    await queryInterface.bulkInsert('Locations', [
      {id:'1', countryID:'1', locationName: 'Belgrade', locationPopulation:'1800000'},
      {id:'2', countryID:'1', locationName: 'Novi Sad', locationPopulation:'250000'},
      {id:'3', countryID:'1', locationName: 'Kosovska Mitrovica', locationPopulation:'800000'},
      {id:'4', countryID:'2', locationName: 'Moscow', locationPopulation:'18000000'},
      {id:'5', countryID:'2', locationName: 'St. Petersburg', locationPopulation:'10000000'},
      {id:'6', countryID:'3', locationName: 'New York', locationPopulation:'20000000'},
      {id:'7', countryID:'3', locationName: 'Chicago', locationPopulation:'10000000'},
      {id:'8', countryID:'3', locationName: 'Los Angeles', locationPopulation:'15000000'},
      {id:'9', countryID:'4', locationName: 'Paris', locationPopulation:'8000000'},
      {id:'10', countryID:'4', locationName: 'Nica', locationPopulation:'500000'},
      {id:'11', countryID:'5', locationName: 'Berlin', locationPopulation:'7000000'},
      {id:'12', countryID:'5', locationName: 'Munich', locationPopulation:'2000000'},
      {id:'13', countryID:'5', locationName: 'Stuttgart', locationPopulation:'700000'},
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
