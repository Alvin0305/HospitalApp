import express from "express";
import { changeAppointmentStatus, createAppointment, getAppointmentsByDoctor, getAppointmentsByUser } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/patient/:id", getAppointmentsByUser);
router.post("/doctor/:id", getAppointmentsByDoctor);
router.post("/change-status/:id", changeAppointmentStatus);
router.post("/:patient_id/:doctor_id", createAppointment);

export default router;
