import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  nombre: Joi.string().min(3).required(),
  monto: Joi.alternatives().try(Joi.string().min(1), Joi.number()).required(),
  fecha: Joi.alternatives().try(Joi.string().min(3), Joi.number()).required(),
  categoria: Joi.string().min(5).required(),
});

export const validarGasto = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

