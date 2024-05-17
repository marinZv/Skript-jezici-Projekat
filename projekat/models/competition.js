'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Club, Match}){
      this.hasMany(Club, {
        foreignKey: 'competitionID',
        onDelete: 'cascade',
        hooks: true
      });
      this.hasMany(Match, {
          foreignKey: 'competitionID',
          onDelete: 'cascade',
          hooks: true
      });
    }
  }
  Competition.init({
    //competitionID: DataTypes.INTEGER,
    competitionName: DataTypes.STRING,
    system: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};