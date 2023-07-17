import { Model, Schema, model } from "mongoose";

export interface IGastos {
  nombre: string;
  costo: number;
  pago: boolean;
}

const GastosSchema = new Schema<IGastos>({
  nombre: { type: String, unique: true },
  costo: { type: Number, required: true },
  pago: { type: Boolean, required: true },
});
const Gastos: Model<IGastos> = model<IGastos>("Gastos", GastosSchema);

export default Gastos;
