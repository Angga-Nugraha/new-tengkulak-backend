import express from "express";
import { createProduct } from "../controllers/Product.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();


router.post('/product', verifyToken, verifyUser, createProduct);

export default router;