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

      await queryInterface.bulkInsert('Clubs',
        [
          {id:'1',competitionID: '1', locationID:'1', clubName: 'Crvena Zvezda', clubTrophies: '60'},
          {id:'2', competitionID: '1', locationID:'2', clubName: 'Partizan', clubTrophies: '80'},
          {id:'3', competitionID: '2', locationID:'3', clubName: 'Barselona', clubTrophies: '90'},
          {id:'4', competitionID: '2', locationID:'4', clubName: 'Real Madrid', clubTrophies: '85'},
          {id:'5', competitionID: '3', locationID:'5', clubName: 'Asvel', clubTrophies: '15'},
          {id:'6', competitionID: '3', locationID:'6', clubName: 'Nant', clubTrophies: '7'},
          {id:'7', competitionID: '4', locationID:'7', clubName: 'KK Split', clubTrophies: '22'},
          {id:'8', competitionID: '4', locationID:'8', clubName: 'KK Cibona', clubTrophies: '33'},
          {id:'9', competitionID: '5', locationID:'9', clubName: 'LA Lakers', clubTrophies: '32'},
          {id:'10', competitionID: '5', locationID:'10', clubName: 'Chicago Buls', clubTrophies: '35'},
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
