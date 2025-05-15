import express from "express";
import { createDepartment, deleteDepartment, getAllDepartment, getDepartmentById, updateDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);
router.get("/:id", getDepartmentById);
router.get("/", getAllDepartment);


export default router;