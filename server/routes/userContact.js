import express from "express";
import { getUserPhoneNumbers } from "../controllers/userContactController.js";

const router = express.Router();

router.get("/:id", getUserPhoneNumbers);

export default router;