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

    await queryInterface.bulkInsert('Users',
     [  {id:'1', roleID:'1', userName:'marin',password:'bratemoj', email:'marin@raf.rs'},
        {id:'2', roleID:'1', userName:'vidra',password:'bratetvoj', email:'vidra@raf.rs'},
        {id:'3', roleID:'1', userName:'joksim',password:'bratesvoj', email:'joksim@raf.rs'},
        {id:'4', roleID:'1', userName:'raketa',password:'brateonoj', email:'raketa@raf.rs'},
        {id:'5', roleID:'1', userName:'vuki',password:'bratebre', email:'vuki@raf.rs'},
        {id:'6', roleID:'1', userName:'maki',password:'brateaman', email:'maki@raf.rs'},
        {id:'7', roleID:'1', userName:'miki',password:'brateauf', email:'miki@raf.rs'},
        {id:'8', roleID:'1', userName:'djocgo',password:'bratecovece', email:'djocgo@raf.rs'}
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
