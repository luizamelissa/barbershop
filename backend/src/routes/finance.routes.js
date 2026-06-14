import { Router } from "express";
import * as financeController from "../controllers/finance.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Apenas admin/barber podem ver e deletar finanças
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "barber"]),
  financeController.getFinance
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "barber"]),
  financeController.deleteFinance
);

export default router;