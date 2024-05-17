'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TeamMember, Competition, Location}){
      this.hasMany(TeamMember, {
          foreignKey: 'clubID',
          onDelete: 'cascade',
          hooks: true
      });
      this.belongsTo(Competition, {
          foreignKey: 'competitionID'
      });
      this.belongsTo(Location, {
        foreignKey: 'locationID'
      });
    }
  }
  Club.init({
    // clubID: DataTypes.INTEGER,
    clubName: DataTypes.STRING,
    clubTrophies: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};