import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContactMessage,
  getContactMessages,
  toggleReadStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiter for contact submission: 10 messages per 1 hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many messages sent from this IP, please try again after an hour.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.route('/')
  .post(contactLimiter, submitContactMessage)
  .get(protect, getContactMessages);

router.route('/:id/read')
  .put(protect, toggleReadStatus);

router.route('/:id')
  .delete(protect, deleteContactMessage);

export default router;
