import Match from '../database/models/Matches';

const getAllMatches = async () => {
  const allMatches = await Match.findAll();

  return allMatches;
};

const getMatchesWithFilter = async (inProgress: string) => {
  if (inProgress === 'true') {
    const matches = await Match.findAll({
      where: { inProgress: true },
    });
    console.log('inProgress: ', inProgress);
    return matches;
  }

  if (inProgress === 'false') {
    const matches = await Match.findAll({
      where: { inProgress: false },
    });
    console.log('inProgress: ', inProgress);
    return matches;
  }
};

export default {
  getAllMatches,
  getMatchesWithFilter,
};
