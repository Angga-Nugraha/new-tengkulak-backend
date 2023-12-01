import express from "express";

import { changePassword, deleteUser, getAllUser, getUserById, searchUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../midleware/verifyToken.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyAdmin } from "../midleware/verifyAdmin.js";

const router = express.Router();

router.get("/user/search", verifyToken, verifyUser, searchUser);
router.get("/user", verifyToken, verifyAdmin, getAllUser);
router.get("/user/:id", verifyToken, verifyUser, getUserById);
router.patch("/user/:id", verifyToken, verifyUser, updateUser);
router.delete("/user/:id", verifyToken, verifyUser, deleteUser);
router.patch("/user/change-password/:id", verifyToken, verifyUser, changePassword);

export default router;
