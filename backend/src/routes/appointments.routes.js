import { Router } from "express";
import * as appointmentsController from "../controllers/appointments.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Todos logados podem criar ou ver
router.post("/", verifyToken, appointmentsController.createAppointment);
router.get("/", verifyToken, appointmentsController.getAppointments);

// Mudar status e deletar
router.put("/:id/status", verifyToken, appointmentsController.updateStatus);
router.delete("/:id", verifyToken, appointmentsController.deleteAppointment);

export default router;