import { TMatch, TNewMatch, TSortedMatch } from '../types/matchType';
import Match from '../database/models/Matches';
import teamService from './teamService';

const sortTeamsByName = async (matchesArray: TMatch[]): Promise<TSortedMatch[]> => {
  const resultArray: TSortedMatch[] = await Promise.all(matchesArray.map(async (match) => {
    const { id, homeTeamGoals, awayTeamGoals, inProgress } = match;
    const homeTeam = await teamService.getTeamById(match.homeTeamId.toString());
    const awayTeam = await teamService.getTeamById(match.awayTeamId.toString());

    return {
      id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    };
  }));

  return resultArray;
};

const getAllMatches = async () => {
  const allMatches = await Match.findAll();
  const sortedMatches = await sortTeamsByName(allMatches);

  return sortedMatches;
};

const getMatchesWithFilter = async (inProgress: string) => {
  if (inProgress === 'true') {
    const matches = await Match.findAll({
      where: { inProgress: true },
    });

    const sortedMatches = await sortTeamsByName(matches);
    return sortedMatches;
  }

  if (inProgress === 'false') {
    const matches = await Match.findAll({
      where: { inProgress: false },
    });
    const sortedMatches = await sortTeamsByName(matches);
    return sortedMatches;
  }
};

const addNewMatch = async (newMatch: TNewMatch) => {
  const addedMatch = await Match.create({
    ...newMatch,
    inProgress: true,
  });

  return addedMatch.dataValues;
};

const finishMatch = async (id: string) => {
  await Match.update({ inProgress: false }, { where: { id: Number(id) } });

  return { message: 'Finished' };
};

export default {
  getAllMatches,
  getMatchesWithFilter,
  addNewMatch,
  finishMatch,
};
