import Match from '../database/models/Matches';
import teamService from './teamService';
import { TMatch } from '../types/matchType';

const calculatePoints = (homeMatches: TMatch[], awayMatches: TMatch[]) => {
  const allMatches = [...homeMatches, ...awayMatches];
  const homeVictories = homeMatches
    .filter((match: TMatch) => match.homeTeamGoals > match.awayTeamGoals);
  const awayVictories = awayMatches
    .filter((match: TMatch) => match.awayTeamGoals > match.homeTeamGoals);

  const homeLosses = homeMatches
    .filter((match: TMatch) => match.homeTeamGoals < match.awayTeamGoals);
  const awayLosses = awayMatches
    .filter((match: TMatch) => match.awayTeamGoals < match.homeTeamGoals);

  const totalDraws = allMatches
    .filter((match: TMatch) => match.awayTeamGoals === match.homeTeamGoals).length;

  const totalVictories = homeVictories.length + awayVictories.length;
  const totalLosses = homeLosses.length + awayLosses.length;
  const totalPoints = (totalVictories * 3) + totalDraws;
  const totalGames = totalVictories + totalLosses + totalDraws;

  return { totalPoints, totalVictories, totalLosses, totalDraws, totalGames };
};

const calculateGoals = (homeMatches: TMatch[], awayMatches: TMatch[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  homeMatches.forEach((match: TMatch) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  awayMatches.forEach((match: TMatch) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const getTeamGames = async (id: number) => {
  const homeGames = await Match.findAll({
    where: { homeTeamId: id, inProgress: false },
  });
  const awayGames = await Match.findAll({
    where: { awayTeamId: id, inProgress: false },
  });

  return { homeGames, awayGames };
};

const getTeamStatistics = async (id: number, teamName: string) => {
  const { homeGames, awayGames } = await getTeamGames(id);
  const { totalPoints, totalVictories, totalLosses,
    totalDraws, totalGames } = calculatePoints(homeGames, awayGames);
  const { goalsFavor, goalsOwn, goalsBalance } = calculateGoals(homeGames, awayGames);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return {
    name: teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
};

const getLeaderboard = async () => {
  const allTeams = await teamService.getAllTeams();

  const leaderboard = await Promise.all(allTeams.map(async (team) => {
    const { id, teamName } = team;
    const teamInfo = await getTeamStatistics(id, teamName);

    return teamInfo;
  }));

  const sortedLeaderboard = leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
  ));

  return sortedLeaderboard;
};

export default {
  getLeaderboard,
};
