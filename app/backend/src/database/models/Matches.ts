import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    field: 'home_team_id',
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    field: 'away_team_id',
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'id', as: 'teamAway' });

Match.belongsTo(Team, { foreignKey: 'id', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'id', as: 'teamAway' });

export default Match;
