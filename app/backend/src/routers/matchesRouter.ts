import { Router } from 'express';
import validateMatchInput from '../middlewares/validateMatchInput';
import matchController from '../database/controllers/matchController';

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAllMatches);
matchesRouter.post('/', validateMatchInput, matchController.addNewMatch);
matchesRouter.patch('/:id/finish', matchController.finishMatch);

export default matchesRouter;
