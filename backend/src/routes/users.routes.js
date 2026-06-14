import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Rotas protegidas (apenas admin pode ver todos ou deletar)
router.get(
  "/",
  verifyToken,
  checkRole(["admin"]),
  usersController.getUsers
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  usersController.deleteUser
);

export default router;