import express from "express";
import { createBranch, deleteBranch, deleteHeadHospital, getAllBranches } from "../controllers/hospitalBranchController.js";

const router = express.Router();

router.post("/:id", createBranch);
router.get("/:id", getAllBranches);
router.delete("/branch/:id", deleteBranch);
router.delete("/head/:id", deleteHeadHospital);

export default router;
