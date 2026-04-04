import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder } from '../controllers/orderController.js';

router.post('/', addOrderItems);
router.get('/', getAllOrders);
router.get('/myorders', getMyOrders);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/cancel', cancelOrder);

export default router;
