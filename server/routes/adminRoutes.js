import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiter for login: max 10 requests per 15 mins
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, adminLogin);
router.post('/logout', adminLogout);
router.get('/profile', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);

export default router;
