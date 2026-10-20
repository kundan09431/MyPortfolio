import Experience from '../models/Experience.js';

// @desc    Get all experience records
// @route   GET /api/experience
// @access  Public
export const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experience.length,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add experience record
// @route   POST /api/experience
// @access  Private (Admin)
export const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Experience record added successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience record
// @route   PUT /api/experience/:id
// @access  Private (Admin)
export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience record updated successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience record
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
