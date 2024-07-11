import { Document, Schema, model } from 'mongoose';

// Definir la interfaz para el modelo Usuario
export interface IGasto extends Document {
  nombre: string;
  monto: number;
  categoria: string;
}

// Definir el esquema para el modelo Gasto
const gastoSchema = new Schema<IGasto>({
  nombre: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
    unique: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

// Definir el modelo Usuario
const Gasto = model<IGasto>('Gasto', gastoSchema);

export default Gasto;
