import express from 'express';
const router = express.Router();
import { subscribe, getSubscribers, deleteSubscriber } from '../controllers/subscriberController.js';

router.post('/', subscribe);
router.get('/', getSubscribers);
router.delete('/:id', deleteSubscriber);

export default router;
