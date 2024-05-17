'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arena extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Match, Location}){
      this.hasMany(Match, {
          foreignKey: 'arenaID',
          onDelete: 'cascade',
          hooks: true
      });
      this.belongsTo(Location, {
          foreignKey: 'locationID'
      });
    }
  }
  Arena.init({
    //arenaID: DataTypes.INTEGER,
    arenaName: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Arena',
  });
  return Arena;
};