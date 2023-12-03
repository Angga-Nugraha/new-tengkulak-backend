import express from "express";

import { changePassword, deleteUser, getAllUser, getUserById, searchUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../midleware/verifyToken.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyAdmin } from "../midleware/verifyAdmin.js";

const router = express.Router();

router.get("/api/user/search", verifyToken, verifyUser, searchUser);
router.get("/api/user", verifyToken, verifyAdmin, getAllUser);
router.get("/api/user/:id", verifyToken, verifyUser, getUserById);
router.patch("/api/user/:id", verifyToken, verifyUser, updateUser);
router.delete("/api/user/:id", verifyToken, verifyUser, deleteUser);
router.patch("/api/user/change-password/:id", verifyToken, verifyUser, changePassword);

export default router;
