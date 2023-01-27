import TTeam from './teamType';

type TMatch = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress:boolean,
};

type TSortedMatch = {
  id: number,
  homeTeam: TTeam,
  homeTeamGoals: number,
  awayTeam: TTeam,
  awayTeamGoals: number,
  inProgress: boolean,
};

export {
  TMatch,
  TSortedMatch,
};
