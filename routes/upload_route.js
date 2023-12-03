import express from "express";
import { uploadAvatar, uploadproduct } from "../controllers/Upload.js";
import { uploadAvatarImage, uploadProductImage } from "../midleware/multerHandler.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { createFolder } from "../utils/utils.js";

const router = express.Router();

router.post("/user/upload-avatar", verifyUser, uploadAvatarImage.single('image'), uploadAvatar);
router.post('/product/upload/:id', createFolder, uploadProductImage.array('image', 4), uploadproduct);

export default router;
