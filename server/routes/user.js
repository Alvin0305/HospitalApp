import express from "express";
import { deleteUser, getAllUsers, getContactedUsers, getUserByBloodGroup, getUserById, getUsersWhoDonatesBlood, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/get/willing-to-dontate", getUsersWhoDonatesBlood);
router.get("/get/contacted/:id", getContactedUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/get/bloodgroup", getUserByBloodGroup);

export default router;