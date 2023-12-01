import express from "express";

import { login, logout, register } from "../controllers/auth.js";
import { verifyInput } from "../midleware/verifyInput.js";

const router = express.Router();

router.post("/register", verifyInput, register);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
