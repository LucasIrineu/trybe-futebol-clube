import TTeam from './teamType';

type TMatch = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
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

type TNewMatch = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export {
  TMatch,
  TSortedMatch,
  TNewMatch,
};
