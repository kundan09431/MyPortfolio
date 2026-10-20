import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const skills = await Skill.find(query).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
