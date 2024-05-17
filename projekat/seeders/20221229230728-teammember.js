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
    await queryInterface.bulkInsert('teamMembers', 
    [
      {id: '1', clubID: '1', countryID: '1', teamMemberName: 'Milan Marinkovic', teamRole: 'point guard', trophiesNumber: '2'},
      {id: '2', clubID: '1', countryID: '1', teamMemberName: 'Marinko Milanovic', teamRole: 'power forward',trophiesNumber: '7'},
      {id: '3', clubID: '2', countryID: '1', teamMemberName: 'Milos Milosevic', teamRole:'center', trophiesNumber: '5'},
      {id: '4', clubID: '2', countryID: '2', teamMemberName: 'Marko Markovic', teamRole: 'point guard', trophiesNumber: '4'},
      {id: '5', clubID: '3', countryID: '2', teamMemberName: 'Marko Milosevic', teamRole:'small forward', trophiesNumber: '12'},
      {id: '6', clubID: '3', countryID: '2', teamMemberName: 'Milos Markovic', teamRole: 'power forward',trophiesNumber: '13'},
      {id: '7', clubID: '4', countryID: '3', teamMemberName: 'Petar Jankovic', teamRole: 'shooting guard', trophiesNumber: '7'},
      {id: '8', clubID: '4', countryID: '4', teamMemberName: 'Janko Petrovic', teamRole: 'point guard', trophiesNumber: '1'},
      {id: '9', clubID: '5', countryID: '1', teamMemberName: 'Stefan Bogdanovic', teamRole: 'shooting guard', trophiesNumber: '5'},
      {id: '10', clubID: '5', countryID: '2', teamMemberName: 'Bogdan Stefanovic', teamRole: 'power forward', trophiesNumber: '9'},

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
