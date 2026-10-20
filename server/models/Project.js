import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['React', 'MERN Stack', 'JavaScript', 'Java', 'Other'],
      default: 'MERN Stack',
    },
    image: {
      type: String,
      default: '/uploads/project-placeholder.jpg',
    },
    screenshots: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    features: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: 'https://github.com',
    },
    liveDemoUrl: {
      type: String,
      default: '',
    },
    featured: {
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

const Project = mongoose.model('Project', projectSchema);
export default Project;
