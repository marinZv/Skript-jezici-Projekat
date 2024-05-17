'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Location, TeamMember}){
      this.hasMany(Location, {
          foreignKey: 'countryID',
          onDelete: 'cascade',
          hooks: true
      });
      this.hasMany(TeamMember, {
          foreignKey: 'CountryID',
          onDelete: 'cascade',
          hooks: true
      });
    }
  }
  Country.init({
    //countryID: DataTypes.INTEGER,
    countryName: {
       type: DataTypes.STRING,
       unique: true
      },
    countryPopulation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};