import { Router } from 'express';
import matchController from '../database/controllers/matchController';

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAllMatches);
matchesRouter.post('/', matchController.addNewMatch);
matchesRouter.patch('/:id/finish', matchController.finishMatch);

export default matchesRouter;
