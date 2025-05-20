import express from "express";
import {
  getMessagesInConversation,
  sendMessage,
  viewMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/in-conversation/:conversationId", getMessagesInConversation);
router.post("/send", sendMessage);
router.patch("/:messageId", viewMessage);

export default router;
