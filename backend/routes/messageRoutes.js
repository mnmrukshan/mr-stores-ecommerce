import express from 'express';
const router = express.Router();
import { submitMessage, getMessages, deleteMessage } from '../controllers/messageController.js';

router.post('/', submitMessage);
router.get('/', getMessages);
router.delete('/:id', deleteMessage);

export default router;
