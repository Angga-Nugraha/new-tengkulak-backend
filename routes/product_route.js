import express from "express";
import { createProduct, deleteProduct, getAllProduct, getProductByCategory, getProductById, searchProduct } from "../controllers/Product.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();


router.get('/api/product/search', verifyToken, verifyUser, searchProduct);
router.get('/api/product', verifyToken, verifyUser, getAllProduct);
router.post('/api/product', verifyToken, verifyUser, createProduct);
router.get('/api/product/:id', verifyToken, verifyUser, getProductById);
router.delete('/api/product/:id', verifyToken, verifyUser, deleteProduct);
router.get('/api/product/category/:category', verifyToken, verifyUser, getProductByCategory);


export default router;