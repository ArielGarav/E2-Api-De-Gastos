import { Model, Schema, model, ObjectId } from "mongoose";

export interface IUser {
  dni: number;
  nombre: string;
  apellido: string;
  edad: number;
  gastos: ObjectId;
  estadoCivil: boolean;
}

const UserSchema = new Schema<IUser>({
  dni: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  gastos: { type: Schema.Types.ObjectId, ref: "Gastos", required: true },
  estadoCivil: { type: Boolean, required: true },
});
const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
