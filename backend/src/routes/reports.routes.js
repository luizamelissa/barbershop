import { Router } from "express";
import * as reportsController from "../controllers/reports.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Todas as rotas de relatórios são para admins
router.use(verifyToken, checkRole(["admin"]));

router.get("/dashboard", reportsController.getDashboard);
router.get("/finance", reportsController.getFinanceReport);
router.get("/services", reportsController.getServicesReport);
router.get("/clients", reportsController.getClientsReport);
router.get("/schedules", reportsController.getSchedulesReport);

export default router;