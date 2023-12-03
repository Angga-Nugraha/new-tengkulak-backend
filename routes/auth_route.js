import express from "express";

import { login, logout, register } from "../controllers/auth.js";
import { verifyInput } from "../midleware/verifyInput.js";

const router = express.Router();

router.post("/Auth/register", verifyInput, register);
router.post("/Auth/login", login);
router.delete("/Auth/logout", logout);

export default router;
