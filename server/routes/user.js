import express from "express";
import { deleteUser, getAllUsers, getUserByBloodGroup, getUserById, getUsersWhoDonatesBlood, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/get/willing-to-dontate", getUsersWhoDonatesBlood);
router.post("/get/bloodgroup", getUserByBloodGroup);

export default router;