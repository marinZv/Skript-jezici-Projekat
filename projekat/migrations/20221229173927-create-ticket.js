'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderItemID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      matchID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cartItemID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ticketType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seatNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seatSide: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};