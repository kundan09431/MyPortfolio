import Education from '../models/Education.js';

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
export const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ order: 1, startYear: -1 });

    res.status(200).json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add education record
// @route   POST /api/education
// @access  Private (Admin)
export const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Education record added successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private (Admin)
export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education record updated successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private (Admin)
export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
