import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  nombre: Joi.string().min(3).required(),
  monto: Joi.string().min(1).required(),
  fecha: Joi.alternatives().try(
    Joi.string().min(2).max(10),  // Para fechas en formato de cadena
    Joi.number()                  // Para fechas en formato numérico
  ).required(),
});

export const validarCartera = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

