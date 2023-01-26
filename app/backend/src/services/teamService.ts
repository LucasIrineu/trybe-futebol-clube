import Team from '../database/models/Team';

const getAllTeams = async () => {
  const allTeams = await Team.findAll();

  return allTeams;
};

const getTeamById = async (id: string) => {
  const team = await Team.findOne({
    where: { id },
  });

  return team?.dataValues;
};

export default {
  getAllTeams,
  getTeamById,
};
