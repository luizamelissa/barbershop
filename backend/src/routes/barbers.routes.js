import express from "express";
import {
  getBarbers,
  createBarber,
  updateBarber,
  deleteBarber
} from "../controllers/barbers.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = express.Router();

// Públicos ou Clientes podem listar profissionais
router.get("/", getBarbers);

// Apenas admin podem modificar
router.post(
  "/",
  verifyToken,
  checkRole(["admin"]),
  createBarber
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  updateBarber
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  deleteBarber
);

export default router;