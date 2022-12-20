import { Router } from "express";
import {
  addUser,
  deleteUserTable,
  getUsers,
} from "../controller/UserController";
import { verify } from "../middleware/Verify";

const router = Router();

router.get("/users", verify, getUsers);
router.post("/user", addUser);
router.delete("/delete", deleteUserTable);

export default router;
