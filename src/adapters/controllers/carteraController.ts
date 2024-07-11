import { Request, Response } from 'express';
import Cartera, { ICartera } from '../../domain/models/cartera';
import jwt from 'jsonwebtoken';

// Crear un nuevo cartera
export const crearCartera = async (req: Request, res: Response) => {
  try {
    const cartera = new Cartera(req.body);
    await cartera.save();
    const token = jwt.sign({ _id: cartera._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    res.status(201).send({ cartera, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Vlidacion de cartera usando JWT
export const loginCartera = async (req: Request, res: Response) => {
  try {
    const { correo, monto } = req.body;
    const cartera = await Cartera.findOne({ correo });
    if (!cartera || cartera.monto !== monto) {
      return res.status(401).send({ error: 'Credenciales no válidas.' });
    }
    const token = jwt.sign({ _id: cartera._id }, process.env.JWT_SECRET || 'your_secret_key',);
    res.send({ cartera, token });
  } catch (error) {
    res.status(400).send(error);
  }
};


// Obtener todas las carteras
export const obtenerCarteras = async (req: Request, res: Response) => {
  try {
    const carteras = await Cartera.find({});
    res.status(200).send(carteras);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un cartera por ID
export const obtenerCarteraPorId = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const cartera = await Cartera.findById(_id);
    if (!cartera) {
      return res.status(404).send();
    }
    res.status(200).send(cartera);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un cartera por ID
export const actualizarCartera = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body) as Array<keyof ICartera>;
  const allowedUpdates: Array<keyof ICartera> = ['nombre', 'monto', 'fecha'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const cartera = await Cartera.findById(req.params.id);
    if (!cartera) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      (cartera as any)[update] = req.body[update];
    });
    await cartera.save();
    res.status(200).send(cartera);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un cartera por ID
export const eliminarCartera = async (req: Request, res: Response) => {
  try {
    const cartera = await Cartera.findByIdAndDelete(req.params.id);
    if (!cartera) {
      return res.status(404).send();
    }
    res.status(200).send(cartera);
  } catch (error) {
    res.status(500).send(error);
  }
};
