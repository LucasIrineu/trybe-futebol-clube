import { Request, Response } from 'express';
import leaderboardService from '../../services/leaderboardService';

const getLeaderboard = async (_req: Request, res: Response) => {
  const payload = await leaderboardService.getLeaderboard();

  return res.status(200).json(payload);
};

export default {
  getLeaderboard,
};
