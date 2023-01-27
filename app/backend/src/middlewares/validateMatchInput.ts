import { NextFunction, Request, Response } from 'express';
import teamService from '../services/teamService';

const checkIfTeamExists = async (id: number) => {
  const result = await teamService.getTeamById(id.toString());

  return result;
};

const validateMatchInput = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { homeTeamId, awayTeamId } = body;

  const checkHomeTeam = await checkIfTeamExists(homeTeamId);
  const checkAwayTeam = await checkIfTeamExists(awayTeamId);

  if (!checkHomeTeam || !checkAwayTeam) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  next();
};

export default validateMatchInput;
