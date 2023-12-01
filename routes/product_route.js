import express from "express";
import { createProduct, getAllProduct, getProductByCategory, getProductById, searchProduct } from "../controllers/Product.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();


router.get('/product/search', verifyToken, verifyUser, searchProduct);
router.get('/product', verifyToken, verifyUser, getAllProduct);
router.post('/product', verifyToken, verifyUser, createProduct);
router.get('/product/:id', verifyToken, verifyUser, getProductById);
router.get('/product/category/:category', verifyToken, verifyUser, getProductByCategory);


export default router;