import express from "express";
import { uploadAvatar, uploadproduct } from "../controllers/Upload.js";
import { uploadImage } from "../midleware/multerHandler.js";
import { createFolder } from "../utils/utils.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();

router.patch("/api/upload/user/:id", verifyToken, uploadImage.single('user'), uploadAvatar);
router.patch('/api/upload/product/:id', verifyToken, createFolder, uploadImage.array('product', 4), uploadproduct);

export default router;
