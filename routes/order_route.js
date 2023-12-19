import express from 'express';
import { verifyToken } from '../midleware/verifyToken.js';
import { verifyUser } from '../midleware/verifyUser.js';
import { createOrder, getMyOrder, getOrderDetails } from '../controllers/Order.js';


const router = express.Router();

router.post('/api/order', verifyToken, verifyUser, createOrder);
router.get('/api/myorder', verifyToken, verifyUser, getMyOrder);
router.get('/api/order/:orderId', verifyToken, verifyUser, getOrderDetails);
export default router;