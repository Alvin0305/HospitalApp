import express from "express";
import {
    endConversation,
  getAllConversationsByUser,
  getConversationsInChat,
  startConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/start", startConversation);
router.post("/chat", getConversationsInChat);
router.get("/:userId", getAllConversationsByUser);
router.patch("/end/:conversationId", endConversation);

export default router;
