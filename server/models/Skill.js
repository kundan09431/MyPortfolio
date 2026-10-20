import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Frontend',
        'Backend',
        'Database',
        'Programming Languages',
        'Tools',
      ],
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    icon: {
      type: String,
      default: 'Code',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
