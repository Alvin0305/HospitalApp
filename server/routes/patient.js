import express from "express";
import { getAllPatients, getPatientById } from "../controllers/patientController.js";

const router = express.Router();

router.get("/:id", getPatientById);
router.get("/", getAllPatients);

export default router;