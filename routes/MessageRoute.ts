import { Router } from "express";
import { addMessage } from "../controller/MessageController";
import { verify } from "../middleware/Verify";

const router = Router();

router.post("/send", verify, addMessage);

export default router;
