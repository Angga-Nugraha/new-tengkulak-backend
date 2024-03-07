import express from "express";

import { changePassword, deleteUser, getAllUser, getUserById, searchUser, updateAddressUser, updateUser } from "../controllers/User.js";
import { verifyToken } from "../midleware/verifyToken.js";
import { verifyAdmin } from "../midleware/verifyAdmin.js";

const router = express.Router();

router.get("/api/user/search", verifyToken, searchUser);
router.get("/api/user", verifyToken, verifyAdmin, getAllUser);
router.get("/api/user/:id", verifyToken, getUserById);
router.patch("/api/user/:id", verifyToken, updateUser);
router.patch("/api/user-address/:id", verifyToken, updateAddressUser);
router.delete("/api/user/:id", verifyToken, deleteUser);
router.patch("/api/user/change-password/:id", verifyToken, changePassword);

export default router;
