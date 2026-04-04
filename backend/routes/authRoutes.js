import express from 'express';
const router = express.Router();
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

export default router;
