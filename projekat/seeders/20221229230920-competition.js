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
    */await queryInterface.bulkInsert('Competitions',
    [
      {id:'1', competitionName: 'Euroleague', system: 'league'},
      {id:'2', competitionName: 'NBA', system: 'league'},
      {id:'3', competitionName: 'ABA', system: 'league'},
      {id:'4', competitionName: 'Spanish cup', system: 'cup'},
      {id:'5', competitionName: 'France league', system: 'league'}
      
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
