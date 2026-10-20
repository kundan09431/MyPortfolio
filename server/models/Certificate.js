import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    issueDate: {
      type: String,
      required: [true, 'Issue date is required'],
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '/uploads/cert-placeholder.jpg',
    },
    description: {
      type: String,
      default: '',
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

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
