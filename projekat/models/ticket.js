'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItem, Match, CartItem}){
      this.belongsTo(OrderItem, {
          foreignKey: 'orderItemID'
      });
      this.belongsTo(Match, {
          foreignKey: 'matchID'
      });
      this.belongsTo(CartItem, {
          foreignKey: 'cartItemID'
      });
    }
  }
  Ticket.init({
    //ticketID: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    ticketType: DataTypes.STRING,
    seatNumber: DataTypes.INTEGER,
    seatSide: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};