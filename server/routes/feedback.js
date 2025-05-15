import express from "express";
import { createFeedBack, deleteFeedBack, updateFeedBack } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/:user_id/:doctor_id", createFeedBack);
router.delete("/:id", deleteFeedBack);
router.put("/:id", updateFeedBack);

export default router;