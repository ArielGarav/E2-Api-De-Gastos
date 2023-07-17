import mongoose from "mongoose";

export const conectarDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://ArielGaraventa:hYDpVpz5jvDivJVb@arielgaraventa.6r4efwn.mongodb.net/"
    );
    console.log("Base de Datos Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos online");
  }
};
