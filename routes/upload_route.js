import express from "express";
import { uploadAvatar, uploadproduct } from "../controllers/Upload.js";
import { uploadImage } from "../midleware/multerHandler.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { createFolder } from "../utils/utils.js";

const router = express.Router();

router.post("/api/upload/user/", verifyUser, uploadImage.single('user'), uploadAvatar);
router.post('/api/upload/product/:id', verifyUser, createFolder, uploadImage.array('product', 4), uploadproduct);

export default router;
