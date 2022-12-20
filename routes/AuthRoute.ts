import { Router } from "express";
import { signIn, signOut } from "../auth/Auth";
import { verify } from "../middleware/Verify";

const router = Router();

router.post("/signin", signIn);
router.delete("/signout", verify, signOut);

export default router;
