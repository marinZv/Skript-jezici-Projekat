'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Club, Country}){
      this.belongsTo(Club, {
          foreignKey: 'clubID',
      });
      this.belongsTo(Country, {
          foreignKey: 'countryID'
      });
    }
  }
  TeamMember.init({
    //teamMemberID: DataTypes.INTEGER,
    teamMemberName: DataTypes.STRING,
    teamRole: DataTypes.STRING,
    trophiesNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};