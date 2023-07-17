import { Request, Response } from "express";
import Gastos, { IGastos } from "../models/gastos";

export const createGastos = async (req: Request, res: Response) => {
  const gastoData: IGastos = req.body;
  const { nombre, costo, pago } = gastoData;

  if (!nombre || !costo || !pago) {
    res.json({ msj: "Faltan datos necesarios en la petición" });
    return;
  }

  const gastosEnDB = await Gastos.findOne({ nombre: nombre });

  if (gastosEnDB) {
    res.json({ msj: "La camada ya existe en la DB" });
    return;
  }

  const gastos = new Gastos(gastoData);
  await gastos.save();

  res.json({
    msj: "gastos creados",
    gastos,
  });
};
