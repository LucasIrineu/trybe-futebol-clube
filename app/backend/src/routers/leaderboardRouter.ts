import { Router } from 'express';
import leaderboardController from '../database/controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.getLeaderboard);

export default leaderboardRouter;
