import { Request, Response } from 'express';
import Gasto, { IGasto } from '../../domain/models/gasto';
import jwt from 'jsonwebtoken';

// Crear un nuevo Gasto
export const crearGasto = async (req: Request, res: Response) => {
  try {
    const gasto = new Gasto(req.body);
    await gasto.save();
    const token = jwt.sign({ _id: gasto._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    res.status(201).send({ gasto, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Vlidacion de Gasto usando JWT
/* export const loginGasto = async (req: Request, res: Response) => {
  try {
    const { nombre, monto } = req.body;
    const gasto = await Gasto.findOne({ nombre });
    if (!gasto || gasto.monto !== monto) {
      return res.status(401).send({ error: 'Credenciales no válidas.' });
    }
    const token = jwt.sign({ _id: gasto._id }, process.env.JWT_SECRET || 'your_secret_key',);
    res.send({ gasto, token });
  } catch (error) {
    res.status(400).send(error);
  }
}; */


// Obtener todas las Gastos
export const obtenerGastos = async (req: Request, res: Response) => {
  try {
    const gastos = await Gasto.find({});
    res.status(200).send(gastos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un Gasto por ID
export const obtenerGastoPorId = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const gasto = await Gasto.findById(_id);
    if (!gasto) {
      return res.status(404).send();
    }
    res.status(200).send(gasto);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un Gasto por ID
export const actualizarGasto = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body) as Array<keyof IGasto>;
  const allowedUpdates: Array<keyof IGasto> = ['nombre', 'monto', 'categoria'];
/*   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  } */

  try {
    const gasto = await Gasto.findById(req.params.id);
    if (!gasto) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      (gasto as any)[update] = req.body[update];
    });
    await gasto.save();
    res.status(200).send(gasto);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un Gasto por ID
export const eliminarGasto = async (req: Request, res: Response) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) {
      return res.status(404).send();
    }
    res.status(200).send(gasto);
  } catch (error) {
    res.status(500).send(error);
  }
};
