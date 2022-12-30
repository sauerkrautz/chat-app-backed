import { Router } from "express";
import {
  addConversation,
  getConversation,
  deleteConversation,
  getConversations,
} from "../controller/ConversationController";
import { verify } from "../middleware/Verify";

const router = Router();

router.get("/conversations", verify, getConversations);
router.get("/conversation/:id", verify, getConversation);
router.post("/conversation", verify, addConversation);

export default router;
