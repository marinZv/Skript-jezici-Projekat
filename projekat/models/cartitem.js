'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart, Ticket}){
      this.belongsTo(Cart, {
          foreignKey: 'cartID'
      });
      this.hasMany(Ticket, {
          foreignKey: 'cartItemID',
          onDelete: 'cascade',
          hooks: true
      });
    }
  }
  CartItem.init({
    //cartItemID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};