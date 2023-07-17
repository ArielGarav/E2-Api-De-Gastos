import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersByDNI,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router = Router();
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:dni", getUsersByDNI);
router.put("/:dni", updateUser);
router.delete("/:dni", deleteUser);
export default router;
