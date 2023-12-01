import express from "express";
import { uploadAvatar } from "../controllers/Upload.js";
import { uploadAvatarImage } from "../midleware/multerHandler.js";
import { verifyUser } from "../midleware/verifyUser.js";

const router = express.Router();

router.post("/user/upload-avatar", verifyUser, uploadAvatarImage.single('image'), uploadAvatar);

export default router;
