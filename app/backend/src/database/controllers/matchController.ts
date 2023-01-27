import { Request, Response } from 'express';
import matchService from '../../services/matchService';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress) {
    const result = await matchService.getMatchesWithFilter(inProgress as string);

    return res.status(200).json(result);
  }

  const allMatches = await matchService.getAllMatches();

  return res.status(200).json(allMatches);
};

const addNewMatch = async (req: Request, res: Response) => {
  const { body } = req;

  const addedMatch = await matchService.addNewMatch(body);

  return res.status(201).json(addedMatch);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { message } = await matchService.finishMatch(id);

  return res.status(200).json({ message });
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  await matchService.updateMatch(homeTeamGoals, awayTeamGoals, Number(id));

  res.status(200).json({ message: 'Update Sucessful' });
};

export default {
  getAllMatches,
  addNewMatch,
  finishMatch,
  updateMatch,
};
