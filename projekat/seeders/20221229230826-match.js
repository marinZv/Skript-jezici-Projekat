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
    await queryInterface.bulkInsert('Matches',
      [
        {id:1, competitionID: '1', arenaID: '1', refereeName: "Petar Petrovic"},
        {id:2, competitionID: '2', arenaID: '2',refereeName: "Marko Markovic"},
        {id:3, competitionID: '3', arenaID: '3',refereeName: "Stojan Stojanovic"},
        {id:4, competitionID: '4', arenaID: '4',refereeName: "Goran Dejanovic"},
        {id:5, competitionID: '5', arenaID: '5',refereeName: "Borko Stefanovic"}
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
