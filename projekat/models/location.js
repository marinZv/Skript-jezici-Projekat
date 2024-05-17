'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Country, Arena, Club}){
      this.belongsTo(Country, {
          foreignKey: 'countryID',
          as: 'country'
      });
      this.hasMany(Arena, {
          foreignKey: 'locationID',
          onDelete: 'cascade',
          hooks: true
      });
      this.hasMany(Club, {
        foreignKey: 'locationID'
      });
    }
  }
  Location.init({
    //locationID: DataTypes.INTEGER,
    locationName: DataTypes.STRING,
    locationPopulation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};