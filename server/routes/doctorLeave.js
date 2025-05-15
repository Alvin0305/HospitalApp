import express from "express";
import { applyForLeave, cancelLeaveaApplication, getLeaveApplications, updateLeaveaApplication } from "../controllers/doctorLeaveController.js";

const router = express.Router();

router.post("/:id", applyForLeave);
router.delete("/:id", cancelLeaveaApplication);
router.put("/:id", updateLeaveaApplication);
router.get("/", getLeaveApplications);

export default router;
