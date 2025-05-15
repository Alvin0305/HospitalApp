import express from "express";
import { getAllDoctors, getDoctorById, getDoctorsBySpeciality } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/:id", getDoctorById);
router.get("/", getAllDoctors);
router.get("/get/speciality", getDoctorsBySpeciality);

export default router;