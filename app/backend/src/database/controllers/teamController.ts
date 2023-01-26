import { Request, Response } from 'express';
import teamService from '../../services/teamService';

const getAllTeams = async (req: Request, res: Response) => {
  const allTeams = await teamService.getAllTeams();

  return res.status(200).json(allTeams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getTeamById(id);

  return res.status(200).json(team);
};

export default {
  getAllTeams,
  getTeamById,
};
