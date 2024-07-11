import { Document, Schema, model } from 'mongoose';

// Definir la interfaz para el modelo Usuario
export interface ICartera extends Document {
  nombre: string;
  monto: number;
  fecha: string;
}

// Definir el esquema para el modelo cartera
const carteraSchema = new Schema<ICartera>({
  nombre: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
    unique: true,
  },
  fecha: {
    type: String,
    required: true,
  },
});

// Definir el modelo Usuario
const Cartera = model<ICartera>('Cartera', carteraSchema);

export default Cartera;
