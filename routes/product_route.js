import express from "express";
import {
    createProduct, deleteProduct, getAllProduct,
    getMyProduct, getProductByCategory, getProductById,
    searchProduct, updateProduct,
} from "../controllers/Product.js";
import { verifyUser } from "../midleware/verifyUser.js";
import { verifyToken } from "../midleware/verifyToken.js";

const router = express.Router();


router.get('/api/product/search', verifyToken, verifyUser, searchProduct);
router.get('/api/product', verifyToken, verifyUser, getAllProduct);
router.get('/api/myproduct', verifyToken, verifyUser, getMyProduct);
router.get('/api/product/:id', verifyToken, verifyUser, getProductById);
router.get('/api/product/category/:category', verifyToken, verifyUser, getProductByCategory);
router.patch('/api/product/update/:id', verifyToken, verifyUser, updateProduct);
router.post('/api/product', verifyToken, verifyUser, createProduct);
router.delete('/api/product/:id', verifyToken, verifyUser, deleteProduct);


export default router;