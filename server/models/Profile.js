import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      default: 'Kundan Kumar',
    },
    title: {
      type: String,
      required: [true, 'Please provide your primary title'],
      trim: true,
      default: 'Full Stack MERN Developer',
    },
    roles: {
      type: [String],
      default: [
        'Full Stack MERN Developer',
        'React & Node.js Specialist',
        'RESTful API Designer',
        'Frontend UI/UX Enthusiast',
      ],
    },
    shortBio: {
      type: String,
      default: 'Passionate Full Stack Developer crafting responsive, performant, and user-centric web applications with the modern MERN stack.',
    },
    aboutText: {
      type: String,
      default: 'I am a dedicated software engineer specializing in modern web technologies. I love solving real-world challenges through clean, maintainable code, sleek user interfaces, and robust server architectures.',
    },
    careerObjective: {
      type: String,
      default: 'To leverage my expertise in full-stack JavaScript development to architect scalable digital solutions and contribute effectively to innovative technology teams.',
    },
    yearsExperience: {
      type: String,
      default: '2+ Years',
    },
    email: {
      type: String,
      default: 'kundan.dev@example.com',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
      trim: true,
    },
    location: {
      type: String,
      default: 'India',
      trim: true,
    },
    availability: {
      type: String,
      default: 'Available for Full-Time / Freelance',
    },
    avatarUrl: {
      type: String,
      default: '/uploads/avatar-placeholder.png',
    },
    resumeUrl: {
      type: String,
      default: '/uploads/sample-resume.pdf',
    },
    socialLinks: {
      github: {
        type: String,
        default: 'https://github.com',
      },
      linkedin: {
        type: String,
        default: 'https://linkedin.com',
      },
      twitter: {
        type: String,
        default: 'https://twitter.com',
      },
      instagram: {
        type: String,
        default: 'https://instagram.com',
      },
      leetcode: {
        type: String,
        default: 'https://leetcode.com',
      },
      email: {
        type: String,
        default: 'mailto:kundan.dev@example.com',
      },
    },
    stats: {
      projectsCompleted: {
        type: Number,
        default: 15,
      },
      codeCommits: {
        type: Number,
        default: 850,
      },
      yearsExperience: {
        type: Number,
        default: 2,
      },
      satisfiedClients: {
        type: Number,
        default: 10,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
