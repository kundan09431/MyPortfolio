import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretportfoliojwtkey_2026_modern_mern_portfolio', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Email not found.',
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.',
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin logout
// @route   POST /api/admin/logout
// @access  Public
export const adminLogout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

// @desc    Get current admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin credentials
// @route   PUT /api/admin/profile
// @access  Private
export const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (req.body.name) admin.name = req.body.name;
    if (req.body.email) admin.email = req.body.email.toLowerCase().trim();

    if (req.body.newPassword) {
      if (!req.body.currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to set a new password.',
        });
      }

      const isMatch = await admin.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect current password.',
        });
      }

      if (req.body.newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.',
        });
      }

      admin.password = req.body.newPassword;
    }

    const updatedAdmin = await admin.save();
    const token = generateToken(updatedAdmin._id);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      token,
      admin: {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
