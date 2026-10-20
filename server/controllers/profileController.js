import Profile from '../models/Profile.js';

// @desc    Get portfolio profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create a default initial profile if none exists
      profile = await Profile.create({});
    }
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio profile
// @route   PUT /api/profile
// @access  Private (Admin)
export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
      await profile.save();
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio profile updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
