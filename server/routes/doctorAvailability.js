import express from "express";
import { addDoctorAvailability, deleteDoctorAvailability, getDoctorAvailabilityByDoctorId, getDoctorsAvailableInRange, updateDoctorAvailability } from "../controllers/doctorAvailabilityController.js";

const router = express.Router();

router.get("/in-range", getDoctorsAvailableInRange);
router.post("/:id", addDoctorAvailability);
router.get("/:id", getDoctorAvailabilityByDoctorId);
router.put("/:id", updateDoctorAvailability);
router.delete("/:id", deleteDoctorAvailability);


export default router;