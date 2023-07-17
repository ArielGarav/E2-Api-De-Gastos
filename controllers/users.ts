import { Request, Response } from "express";
import User, { IUser } from "../models/users";
import Gastos from "../models/gastos";
export const createUser = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  const { dni, nombre, apellido, edad, gastos, estadoCivil } = userData;

  const gastosData = await Gastos.findOne({ nombre: gastos });
  if (!gastosData) {
    res.json({
      msg: " no se encontro los gastos en la base de datos",
    });
    return;
  }
  const userEnDB = await User.findOne({ dni: dni });
  if (userEnDB) {
    res.json({
      msg: "el alumno esta registrado",
    });
    return;
  }
  const user = new User({
    dni,
    nombre,
    apellido,
    edad,
    gastos: gastosData,
    estadoCivil,
  });
  await user.save();

  res.json({
    msj: "success create user",
    user,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const condicion = { estadoCivil: true };
  const users: IUser[] = await User.find(condicion).populate("gastos");

  res.json({
    users,
  });
};

export const getUsersByDNI = async (req: Request, res: Response) => {
  const { dni } = req.params;

  try {
    const users = await User.findOne({ dni: dni }).populate(
      "gastos",
      "nombre costo pago"
    );
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const { dni } = req.params;
  const { estadoCivil, edad, gastos, ...data } = req.body;

  try {
    const gastosData = await Gastos.findOne({ nombre: gastos });
    if (!gastosData) {
      res.json({
        msg: "No se encontraron los gastos en la base de datos",
      });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { dni: dni },
      { ...data, gastos: gastosData._id },
      { new: true }
    );

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { dni } = req.params;
  const user = await User.findOneAndDelete({ dni: dni });

  if (!user) {
    res.json({
      msg: "no existe dicho alumno",
    });
    return;
  }
};

export default User;
