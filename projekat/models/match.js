'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Arena, Ticket, Competition}){
      this.belongsTo(Arena, {
          foreignKey: 'arenaID',
      });
      this.hasMany(Ticket, {
          foreignKey: 'matchID',
          onDelete: 'cascade',
          hooks: true
      });
      this.belongsTo(Competition, {
          foreignKey: 'competitionID'
      });
    }
  }
  Match.init({
    //matchID: DataTypes.INTEGER
    refereeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};