'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role, Payment, Cart}){
      this.hasMany(Payment, {
        foreignKey: 'userID',
        onDelete: 'cascade',
        hooks: true
      });
      this.belongsTo(Role, {
        foreignKey: 'roleID'
      });
      this.hasMany(Cart, {
        foreignKey: 'userID',
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
  User.init({
    //userID: DataTypes.INTEGER,
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail:{
          msg: 'Must be valid e-mail'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};