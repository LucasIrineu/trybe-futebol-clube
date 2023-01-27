import { Router } from 'express';
import validateMatchInput from '../middlewares/validateMatchInput';
import matchController from '../database/controllers/matchController';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAllMatches);
matchesRouter.post('/', validateToken, validateMatchInput, matchController.addNewMatch);
matchesRouter.patch('/:id', matchController.updateMatch);
matchesRouter.patch('/:id/finish', matchController.finishMatch);

export default matchesRouter;
