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
    await queryInterface.bulkInsert('Orders', 
      [
        {id:'1', paymentID: '1', deliveringType: 'Online', postCode: "1651"},
        {id:'2', paymentID: '2', deliveringType: 'onDelivery', postCode: "1651"},
        {id:'3', paymentID: '3', deliveringType: 'onDelivery', postCode: "1651"},
        {id:'4', paymentID: '4', deliveringType: 'onDelivery', postCode: "2166"},
        {id:'5', paymentID: '5', deliveringType: 'onDelivery', postCode: "6516" },
        {id:'6', paymentID: '6', deliveringType: 'Online', postCode: "1691"},
        {id:'7', paymentID: '7', deliveringType: 'Online', postCode: "1691"},
        {id:'8', paymentID: '8', deliveringType: 'Online', postCode: "8484"},
        {id:'9', paymentID: '9', deliveringType: 'Online', postCode: "8484"}, 
        {id:'10', paymentID: '10', deliveringType: 'Online', postCode: "7826"}
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
