import express from "express";
import {
    createProduct, deleteProduct, getAllProduct, getProductByCategory, getProductById,
    searchProduct, updateProduct,
} from "../controllers/Product.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();


router.get('/api/product/search', verifyToken, searchProduct);
router.get('/api/product', verifyToken, getAllProduct);
router.get('/api/product/:id', verifyToken, getProductById);
router.get('/api/product/category/:category', verifyToken, getProductByCategory);
router.patch('/api/product/update/:id', verifyToken, updateProduct);
router.post('/api/product', verifyToken, createProduct);
router.delete('/api/product/:id', verifyToken, deleteProduct);


export default router;