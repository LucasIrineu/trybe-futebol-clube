import { Router } from 'express';
import teamController from '../database/controllers/teamController';

const teamsRouter = Router();

teamsRouter.get('/', teamController.getAllTeams);
teamsRouter.get('/:id', teamController.getTeamById);

export default teamsRouter;
