import { Router } from "express";
import * as servicesController from "../controllers/services.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Públicos ou clientes podem listar serviços
router.get("/", servicesController.getServices);

// Apenas admin/barber podem modificar
router.post(
  "/",
  verifyToken,
  checkRole(["admin"]),
  servicesController.createService
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  servicesController.updateService
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  servicesController.deleteService
);

export default router;