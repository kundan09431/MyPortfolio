import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
      default: 'Computer Science and Engineering',
    },
    startYear: {
      type: String,
      required: [true, 'Start year is required'],
    },
    endYear: {
      type: String,
      default: 'Present',
    },
    description: {
      type: String,
      default: '',
    },
    grade: {
      type: String,
      default: '',
    },
    current: {
      type: Boolean,
      default: false,
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

const Education = mongoose.model('Education', educationSchema);
export default Education;
