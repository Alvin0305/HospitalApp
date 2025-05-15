import express from "express";
import { createHospital, deleteHospitalById, getAllHospitals, getHospitalById, updateHospital } from "../controllers/hospitalController.js";

const router = express.Router();

router.post("/", createHospital);
router.get("/", getAllHospitals);
router.get("/:id", getHospitalById);
router.delete("/:id", deleteHospitalById);
router.put("/:id", updateHospital);

export default router;
