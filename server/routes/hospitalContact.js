import express from "express";
import { addPhoneNumber, deletePhoneNumber, getAllPhoneNumberByHospital, getAllPhoneNumbers } from "../controllers/hospitalContactController.js";

const router = express.Router();

router.post("/:id", addPhoneNumber);
router.delete("/:id", deletePhoneNumber);
router.get("/all", getAllPhoneNumbers);
router.get("/:id", getAllPhoneNumberByHospital);

export default router;
