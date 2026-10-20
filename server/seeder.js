import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';
import Profile from './models/Profile.js';
import Skill from './models/Skill.js';
import Project from './models/Project.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Certificate from './models/Certificate.js';
import ContactMessage from './models/ContactMessage.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Clearing old records...');
    await Admin.deleteMany({});
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    await Certificate.deleteMany({});
    await ContactMessage.deleteMany({});

    console.log('[Seeder] Creating Admin account...');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || 'Kundan Kumar',
      email: (process.env.ADMIN_EMAIL || 'admin@portfolio.com').toLowerCase().trim(),
      password: adminPassword,
      role: 'admin',
    });
    console.log(`[Seeder] Admin created: ${admin.email} / ${adminPassword}`);

    console.log('[Seeder] Creating Profile...');
    await Profile.create({
      name: 'Kundan Kumar',
      title: 'Full Stack MERN Developer',
      roles: [
        'Full Stack MERN Developer',
        'React & Node.js Specialist',
        'RESTful API Architect',
        'Frontend UI/UX Enthusiast',
        'Passionate Problem Solver',
      ],
      shortBio:
        'Hi, I am Kundan Kumar. A passionate Full Stack MERN Developer crafting high-performance, responsive web applications with clean architecture and modern user experiences.',
      aboutText:
        'I specialize in building end-to-end web applications with React, Node.js, Express, and MongoDB. With a solid foundation in computer science and modern software engineering principles, I focus on writing clean, modular code, designing intuitive UI layouts, and engineering secure, scalable backend services.',
      careerObjective:
        'To leverage my full-stack engineering skills in developing impactful, resilient software solutions while continuously growing in a fast-paced technology ecosystem.',
      yearsExperience: '2+ Years',
      email: 'kundan.dev@example.com',
      phone: '+91 98765 43210',
      location: 'India',
      availability: 'Available for Full-Time & Freelance Projects',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      resumeUrl: '/uploads/sample-resume.pdf',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        leetcode: 'https://leetcode.com',
        email: 'mailto:kundan.dev@example.com',
      },
      stats: {
        projectsCompleted: 18,
        codeCommits: 940,
        yearsExperience: 2,
        satisfiedClients: 12,
      },
    });

    console.log('[Seeder] Creating Skills...');
    const skills = [
      // Frontend
      { name: 'HTML5', category: 'Frontend', proficiency: 95, icon: 'FaHtml5', order: 1 },
      { name: 'CSS3', category: 'Frontend', proficiency: 90, icon: 'FaCss3Alt', order: 2 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 92, icon: 'FaJs', order: 3 },
      { name: 'React.js', category: 'Frontend', proficiency: 90, icon: 'FaReact', order: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, icon: 'SiTailwindcss', order: 5 },
      { name: 'Bootstrap', category: 'Frontend', proficiency: 85, icon: 'FaBootstrap', order: 6 },
      // Backend
      { name: 'Node.js', category: 'Backend', proficiency: 88, icon: 'FaNodeJs', order: 7 },
      { name: 'Express.js', category: 'Backend', proficiency: 88, icon: 'SiExpress', order: 8 },
      { name: 'RESTful APIs', category: 'Backend', proficiency: 90, icon: 'TbApi', order: 9 },
      { name: 'JWT & Auth', category: 'Backend', proficiency: 85, icon: 'SiJsonwebtokens', order: 10 },
      // Database
      { name: 'MongoDB', category: 'Database', proficiency: 86, icon: 'SiMongodb', order: 11 },
      { name: 'Mongoose ODM', category: 'Database', proficiency: 88, icon: 'SiMongoose', order: 12 },
      { name: 'MySQL', category: 'Database', proficiency: 80, icon: 'SiMysql', order: 13 },
      // Programming Languages
      { name: 'Java', category: 'Programming Languages', proficiency: 84, icon: 'FaJava', order: 14 },
      { name: 'JavaScript', category: 'Programming Languages', proficiency: 92, icon: 'FaJs', order: 15 },
      { name: 'C#', category: 'Programming Languages', proficiency: 75, icon: 'SiCsharp', order: 16 },
      // Tools
      { name: 'Git', category: 'Tools', proficiency: 90, icon: 'FaGitAlt', order: 17 },
      { name: 'GitHub', category: 'Tools', proficiency: 92, icon: 'FaGithub', order: 18 },
      { name: 'VS Code', category: 'Tools', proficiency: 95, icon: 'VscVscode', order: 19 },
      { name: 'Postman', category: 'Tools', proficiency: 88, icon: 'SiPostman', order: 20 },
    ];
    await Skill.insertMany(skills);

    console.log('[Seeder] Creating Projects...');
    const projects = [
      {
        title: 'Library Management System',
        shortDescription:
          'A comprehensive full-stack library portal for cataloging, issuance, tracking, and fine management.',
        fullDescription:
          'The Library Management System is a robust MERN application engineered for academic institutions. It features catalog search, real-time inventory tracking, automatic overdue fine calculations, and dual-role authentication for librarians and students with complete audit logs and analytical dashboards.',
        category: 'MERN Stack',
        image:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
        screenshots: [
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1507842229451-77b5d7d3d756?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
        features: [
          'Complete inventory management with barcode / ISBN search',
          'Real-time book issuance and check-in with automatic status changes',
          'Fine calculation based on customizable due date policies',
          'Role-based authorization (Admin / Librarian / Student)',
          'Analytics dashboard showing top borrowed books and member stats',
        ],
        githubUrl: 'https://github.com',
        liveDemoUrl: 'https://example.com',
        featured: true,
        order: 1,
      },
      {
        title: 'Authentication & Security System',
        shortDescription:
          'Enterprise-ready authentication microservice with email verification, OTP login, and JWT access tokens.',
        fullDescription:
          'A modern security suite providing battle-tested user registration, login, email verification, time-based OTP login, and secure password reset workflows. Designed with strict input sanitation, rate-limiting, bcrypt hashing, and HTTP-only cookie support.',
        category: 'MERN Stack',
        image:
          'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
        screenshots: [
          'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: [
          'React',
          'Node.js',
          'Express.js',
          'MongoDB',
          'JWT',
          'Bcrypt',
          'Tailwind CSS',
        ],
        features: [
          'Dual-token architecture (Access token & Refresh token)',
          'One-Time Password (OTP) verification with expiry timestamps',
          'Forgot and Reset password via cryptographic email reset tokens',
          'Brute force protection with express-rate-limit',
          'Protected route guards in React frontend',
        ],
        githubUrl: 'https://github.com',
        liveDemoUrl: 'https://example.com',
        featured: true,
        order: 2,
      },
      {
        title: 'Interactive EMI Calculator & Loan Planner',
        shortDescription:
          'Dynamic loan EMI calculator with live payment breakdown, amortization charts, and tenure simulator.',
        fullDescription:
          'A sleek financial tool built for instant loan evaluation. Users can adjust loan amount, interest rates, and loan duration using interactive sliders or numeric inputs to visualize the interest-to-principal ratio, monthly breakdown, and full amortization schedule.',
        category: 'React',
        image:
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        screenshots: [
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        features: [
          'Instant real-time EMI calculation with dynamic formula updates',
          'Visual breakdown of total interest vs. principal payable',
          'Detailed year-by-year and month-by-month repayment schedule table',
          'Export amortization breakdown to printable or PDF format',
          'Supports home loan, personal loan, and car loan presets',
        ],
        githubUrl: 'https://github.com',
        liveDemoUrl: 'https://example.com',
        featured: true,
        order: 3,
      },
      {
        title: 'Academic Grade & Attendance Evaluator',
        shortDescription:
          'Desktop and server integrated student management system built with Java, Spring Boot, and MySQL.',
        fullDescription:
          'An academic record-keeping platform designed to automate student GPA calculation, semester attendance tracking, and performance analytics. Provides teachers and administrators with quick generation of transcripts and automated alerts for students below threshold attendance.',
        category: 'Java',
        image:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        screenshots: [
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['Java', 'Spring Boot', 'MySQL', 'Hibernate'],
        features: [
          'Automated cumulative GPA & letter grade evaluation algorithm',
          'Attendance tracking with deficit alert notification system',
          'Class rank generation and semester transcript exports',
          'Relational database design with optimized indexing',
        ],
        githubUrl: 'https://github.com',
        liveDemoUrl: '',
        featured: false,
        order: 4,
      },
    ];
    await Project.insertMany(projects);

    console.log('[Seeder] Creating Education records...');
    const education = [
      {
        institution: 'Dr. A.P.J. Abdul Kalam Technical University',
        degree: "Bachelor of Technology (B.Tech)",
        fieldOfStudy: 'Computer Science & Engineering',
        startYear: '2022',
        endYear: '2026',
        description:
          'Focusing on Data Structures & Algorithms, Database Management Systems, Computer Networks, Operating Systems, and Object-Oriented Programming.',
        grade: '8.8 / 10 CGPA',
        current: true,
        order: 1,
      },
      {
        institution: 'Senior Secondary School (CBSE)',
        degree: 'Intermediate (12th Grade)',
        fieldOfStudy: 'Physics, Chemistry & Mathematics (PCM)',
        startYear: '2020',
        endYear: '2022',
        description:
          'Graduated with distinction with deep focus on mathematics, analytical reasoning, and computer science foundations.',
        grade: '91.4%',
        current: false,
        order: 2,
      },
    ];
    await Education.insertMany(education);

    console.log('[Seeder] Creating Experience records...');
    const experiences = [
      {
        company: 'InnovateX Technologies',
        jobRole: 'Full Stack Developer Intern',
        type: 'Internship',
        startDate: 'Jun 2024',
        endDate: 'Present',
        current: true,
        location: 'Bengaluru / Remote',
        responsibilities: [
          'Architected and implemented responsive React.js frontend views with Tailwind CSS and Framer Motion.',
          'Built RESTful API microservices in Express.js with JWT authentication and MongoDB aggregation pipelines.',
          'Optimized database queries and API response times by 35% through proper indexing and caching strategies.',
          'Collaborated in agile sprints with code reviews, Git branching strategies, and CI/CD pipelines.',
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git'],
        order: 1,
      },
      {
        company: 'CodeCrafters Dev Lab',
        jobRole: 'Web Development Trainee',
        type: 'Training',
        startDate: 'Jan 2024',
        endDate: 'May 2024',
        current: false,
        location: 'Remote',
        responsibilities: [
          'Built 10+ real-world web applications and JavaScript DOM interactive utilities.',
          'Mastered asynchronous JavaScript, state management, REST API consumption, and component lifecycles.',
          'Implemented responsive designs adhering to mobile-first standards and cross-browser compatibility.',
        ],
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Bootstrap', 'REST APIs'],
        order: 2,
      },
    ];
    await Experience.insertMany(experiences);

    console.log('[Seeder] Creating Certificates...');
    const certificates = [
      {
        title: 'Meta Full Stack Developer Professional Certificate',
        organization: 'Meta & Coursera',
        issueDate: '2024',
        credentialUrl: 'https://coursera.org',
        image:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        description:
          'Demonstrated expertise in frontend React, backend Node/Express, databases, version control, and cloud deployment.',
        order: 1,
      },
      {
        title: 'MongoDB Certified Node.js Developer',
        organization: 'MongoDB University',
        issueDate: '2024',
        credentialUrl: 'https://learn.mongodb.com',
        image:
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
        description:
          'Hands-on mastery in schema design, indexing, CRUD operations, transactions, and aggregation pipelines.',
        order: 2,
      },
      {
        title: 'Problem Solving & Java Gold Badge',
        organization: 'HackerRank',
        issueDate: '2023',
        credentialUrl: 'https://hackerrank.com',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
        description:
          'Achieved 5-star rating in Java and Problem Solving tackling advanced algorithms and data structures.',
        order: 3,
      },
    ];
    await Certificate.insertMany(certificates);

    console.log('[Seeder] Creating Sample Message...');
    await ContactMessage.create({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techrecruiter.com',
      subject: 'Interview Opportunity - Full Stack Developer',
      message:
        'Hi Kundan, I came across your impressive portfolio and projects like the Library Management System. We have an exciting Full Stack developer opening that matches your skillset. Would you be open for a quick chat this week?',
      isRead: false,
    });

    console.log('[Seeder] Database successfully seeded with rich sample data! ✅');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error] ${error.message}`);
    process.exit(1);
  }
};

seedData();
