import { Router } from 'express';
import matchController from '../database/controllers/matchController';

const matchesRouter = Router();

matchesRouter.get('/', matchController.getAllMatches);

export default matchesRouter;
