import express from "express";
import barbersController from "../controllers/barbers.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = express.Router();

// Públicos ou Clientes podem listar profissionais
router.get("/", barbersController.getBarbers);

// Apenas admin/barber podem modificar
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "barber"]),
  barbersController.createBarber
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "barber"]),
  barbersController.updateBarber
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "barber"]),
  barbersController.deleteBarber
);

export default router;