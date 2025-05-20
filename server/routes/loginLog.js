import express from "express";
import { getLastLoginDetail } from "../controllers/loginlogController.js";

const router = express.Router();

router.get("/:id", getLastLoginDetail);

export default router;
