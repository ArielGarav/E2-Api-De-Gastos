import { Router } from "express";
import { createGastos } from "../controllers/gastoss";

const router = Router();
router.post("/", createGastos);

export default router;
