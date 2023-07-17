import express, { Express } from "express";
import { conectarDB } from "../database/config";
import usersRoutes from "../routes/users";
import gastosRoutes from "../routes/gastoss";

export class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.conexionaDB();
    this.middlewares();
    this.routes();
  }

  async conexionaDB(): Promise<void> {
    await conectarDB();
  }

  middlewares(): void {
    this.app.use(express.json());
  }
  routes(): void {
    this.app.use("/users", usersRoutes);
    this.app.use("/gastos", gastosRoutes);
  }
  listen(): void {
    this.app.listen(8080, () => {
      console.log("Corriendo en el puerto 8080");
    });
  }
}
