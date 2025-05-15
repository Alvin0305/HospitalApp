import express from "express";
import { readNotification, sendNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/:id", sendNotification);
router.patch("/:id", readNotification);

export default router;
