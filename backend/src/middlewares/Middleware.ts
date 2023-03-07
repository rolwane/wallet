import { NextFunction, Request, Response } from 'express';
import BadRequestException from '../exceptions/BadRequestException';
import Joi from 'joi';

class Middleware {

  public validateExpenseBody = async (req: Request, res: Response, next: NextFunction) => {

    const schema = Joi.object({
      title: Joi.string().required(),
      value: Joi.number().min(0).required(),
      dueDate: Joi.string().required(),
      paid: Joi.boolean().required(),
    });

    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };

}

export default new Middleware();
