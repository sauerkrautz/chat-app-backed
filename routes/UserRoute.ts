import { Router } from "express";
import {
  addUser,
  deleteUserTable,
  getUser,
  getUserById,
  getUsers,
} from "../controller/UserController";
import { verify } from "../middleware/Verify";

const router = Router();

router.get("/users", verify, getUsers);
router.get("/user", verify, getUser);
router.get("/user/:id", verify, getUserById);
router.post("/user", addUser);
router.delete("/delete", verify, deleteUserTable);

export default router;
