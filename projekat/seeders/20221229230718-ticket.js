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
    await queryInterface.bulkInsert('Tickets', 
      [
        {id: '1', cartItemID:'1', orderItemID: "1", matchID: '1', price: '5000', ticketType: 'VIP', seatNumber: '20', seatSide: 'West'},
        {id: '2', cartItemID:'2', orderItemID: "1", matchID: '1', price: '5000', ticketType: 'VIP', seatNumber: '4', seatSide: 'West'},
        {id: '3', cartItemID:'3', orderItemID: "1", matchID: '1', price: '5000', ticketType: 'VIP', seatNumber: '7', seatSide: 'East'},
        {id: '4', cartItemID:'4', orderItemID: "1", matchID: '2', price: '2000', ticketType: 'REGULAR', seatNumber: '9', seatSide: 'East'},
        {id: '5', cartItemID:'5', orderItemID: "1", matchID: '2', price: '2000', ticketType: 'REGULAR', seatNumber: '13', seatSide: 'South'},
        {id: '6', cartItemID:'6', orderItemID: "1", matchID: '3', price: '2000', ticketType: 'REGULAR', seatNumber: '89', seatSide: 'South'},
        {id: '7', cartItemID:'7', orderItemID: "1", matchID: '3', price: '5000', ticketType: 'VIP', seatNumber: '25', seatSide: 'West'},
        {id: '8', cartItemID:'1', orderItemID: "1", matchID: '3', price: '5000', ticketType: 'VIP', seatNumber: '27', seatSide: 'West'},
        {id: '9', cartItemID:'2', orderItemID: "1", matchID: '3', price: '5000', ticketType: 'VIP', seatNumber: '31', seatSide: 'West'},
        {id: '10', cartItemID:'3', orderItemID: "1", matchID: '3', price: '2000', ticketType: 'REGULAR', seatNumber: '26', seatSide: 'North'},
        {id: '11', cartItemID:'4', orderItemID: "1", matchID: '4', price: '2000', ticketType: 'REGULAR', seatNumber: '21', seatSide: 'North'},
        {id: '12', cartItemID:'5', orderItemID: "1", matchID: '5', price: '2000', ticketType: 'REGULAR', seatNumber: '2', seatSide: 'West'},


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
