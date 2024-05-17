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
    await queryInterface.bulkInsert('Countries', [
      {id:'1', countryName: 'Serbia', countryPopulation: '7000000'},
      {id:'2', countryName: 'Russia', countryPopulation: '147000000'},
      {id:'3', countryName: 'USA', countryPopulation: '320000000'},
      {id:'4', countryName: 'France', countryPopulation: '80000000'},
      {id:'5', countryName: 'Germany', countryPopulation: '85000000'}
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
