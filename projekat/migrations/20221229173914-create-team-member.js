'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teamMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clubID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      countryID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      teamMemberName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      teamRole: {
        type: Sequelize.STRING,
        allowNull:false
      },
      trophiesNumber: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('teamMembers');
  }
};