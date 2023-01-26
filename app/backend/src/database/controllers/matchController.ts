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

export default {
  getAllMatches,
};
