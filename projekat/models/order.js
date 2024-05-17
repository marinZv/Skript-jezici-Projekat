'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItem, Payment}){
      this.hasMany(OrderItem, {
          foreignKey: 'orderID',
          onDelete: 'cascade',
          hooks: true
      });
      this.belongsTo(Payment, {
          foreignKey: 'paymentID'
      });
    }
  }
  Order.init({
    //orderID: DataTypes.INTEGER,
    //totalPrice: DataTypes.FLOAT
    deliveringType: DataTypes.STRING,
    postCode: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};