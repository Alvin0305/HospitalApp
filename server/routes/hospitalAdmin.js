import express from "express";
import { deleteHospitalAdmin, getAllHospitalAdmins, getHospitalAdmin, updateHospitalAdmin } from "../controllers/hospitalAdminController.js";

const router = express.Router();

router.get("/:id", getHospitalAdmin);
router.get("/", getAllHospitalAdmins);
router.put("/:id", updateHospitalAdmin);
router.delete("/:id", deleteHospitalAdmin);


export default router;