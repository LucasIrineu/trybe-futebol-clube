import { NextFunction, Request, Response } from 'express';

const validateMatchInput = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { homeTeamId, awayTeamId } = body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

export default validateMatchInput;
