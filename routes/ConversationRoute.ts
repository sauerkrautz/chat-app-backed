import { Router } from "express";
import {
  addConversation,
  getConversation,
  deleteConversation,
} from "../controller/ConversationController";
import { verifyConversation } from "../middleware/Verify";

const router = Router();

router.get("/conversation", verifyConversation, getConversation);
router.post("/conversation", addConversation);

export default router;
