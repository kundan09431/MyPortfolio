import ContactMessage from '../models/ContactMessage.js';
import validator from 'validator';

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Field Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long.',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long.',
      });
    }

    const newMessage = await ContactMessage.create({
      name: validator.escape(name.trim()),
      email: email.trim().toLowerCase(),
      subject: validator.escape(subject.trim()),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle message read status
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
export const toggleReadStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;
    await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${message.isRead ? 'read' : 'unread'}`,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
