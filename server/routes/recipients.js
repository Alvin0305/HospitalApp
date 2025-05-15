import express from "express";
import { createRecipient, deleteRecipient, getAllRecipients, updateRecipient } from "../controllers/recipientController.js";

const router = express.Router();

router.post("/:id", createRecipient);
router.get("/", getAllRecipients);
router.put("/:id", updateRecipient);
router.delete("/:id", deleteRecipient);

export default router;