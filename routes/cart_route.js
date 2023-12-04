import express from 'express';
import { verifyUser } from '../midleware/verifyUser.js';
import { verifyToken } from '../midleware/verifyToken.js';
import { addToCart, getAllCart, getMyCart, removeProductFromCart } from '../controllers/Cart.js';
import { verifyAdmin } from '../midleware/verifyAdmin.js';

const router = express.Router();


router.get('/api/cart/', verifyAdmin, verifyToken, getAllCart);
router.get('/api/mycart/', verifyToken, getMyCart);
router.post('/api/cart/product', verifyUser, verifyToken, addToCart);
router.delete('/api/cart/product/:id', verifyUser, verifyToken, removeProductFromCart);

export default router;