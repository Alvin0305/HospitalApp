import express from "express";
import { registerUser, loginUser, registerDoctor, loginDoctor, registerHospitalAdmin, loginHospitalAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/patient/register", registerUser);
router.post("/patient/login", loginUser);
router.post("/doctor/register", registerDoctor);
router.post("/doctor/login", loginDoctor);
router.post("/hospitaladmin/register", registerHospitalAdmin);
router.post("/hospitaladmin/login", loginHospitalAdmin);

export default router;
