'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order, User}){
      this.hasMany(Order, {
          foreignKey: 'paymentID',
          onDelete: 'cascade',
          hooks: true
      });
      this.belongsTo(User, {
          foreignKey: 'userID'
      });
    }
  }
  Payment.init({
    //paymentID: DataTypes.INTEGER,
    cardID: DataTypes.STRING,
    cardOwner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};