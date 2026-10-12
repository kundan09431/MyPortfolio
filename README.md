# 🚀 Professional MERN Stack Portfolio & Admin Control Center

A modern, production-ready, fully responsive, and visually attractive **Personal Portfolio Web Application** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), styled with **Tailwind CSS**, animated with **Framer Motion**, and powered by a secure **Admin Dashboard** with JWT authentication.

---

## 🌟 Highlights & Features

### 🖥️ Public Portfolio
* **Hero Section**: Dynamic typing animation across developer roles, neon-accented profile card, floating tech pills, quick actions ("View My Work", "Resume Preview"), and social media connectivity (GitHub, LinkedIn, LeetCode, Email).
* **About Me**: Career objective, personal summary, years of experience counter, key highlights (availability, location, email), and direct resume download.
* **Skills Section**: Tabbed categorization (**Frontend, Backend, Database, Programming Languages, Tools**), animated proficiency bars, technology icons, and hover glow effects.
* **Featured Projects**: Filter by category (**All, React, MERN Stack, JavaScript, Java**), live search bar by keyword/technology, card preview, live demo and source code links.
* **Project Details Page (`/projects/:id`)**: Dedicated showcase route with full markdown descriptions, feature lists, tech stack pills, screenshots gallery, and external links.
* **Education & Experience**: Interactive vertical timelines with degree milestones, GPA/honors, work experience cards with responsibility bullet points, and tech tags.
* **Certificates & Achievements**: Modern credential cards with organization badges, dates, and verification links.
* **Resume Preview Modal**: Interactive resume overview with quick skills summary and instant PDF download.
* **Contact Form**: Real-time field validation, MongoDB persistence, rate-limiting spam protection, celebration confetti (`canvas-confetti`), and notifications (`react-toastify`).
* **UX Enhancements**: Dark / Light theme switch, top-fixed scroll progress indicator, floating back-to-top button, smooth section scrolling, and accessible mobile menu.

---

### 🛡️ Admin Dashboard (`/admin`)
* **Secure JWT Authentication**: Protected admin login with bcrypt password hashing and token-based route guards (`ProtectedRoute.jsx`).
* **Overview KPI Metrics**: Live counts of total projects, skills, education records, and unread incoming inquiries.
* **Profile Management**: Update name, titles, bio, about text, social links, plus avatar and PDF resume uploads.
* **Skills Management**: Add, edit, delete, categorize, and tune proficiency sliders.
* **Projects Management**: Add, edit, and delete projects, upload project images (`/api/upload`), configure tech stack tags, and write bulleted features.
* **Education & Experience Management**: Full CRUD over academic degrees, companies, roles, and dates.
* **Certificates Management**: Upload certificate credentials, images, and issuers.
* **Contact Messages Inbox**: Read inquiries, toggle read/unread status, reply via direct mailto, and delete messages.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js 18, Vite, React Router DOM v6, Tailwind CSS, Framer Motion, Axios, React Icons, Lucide React, React Toastify, Canvas Confetti |
| **Backend** | Node.js (ESM), Express.js, MongoDB, Mongoose ODM, JSON Web Tokens (JWT), Bcrypt.js, Multer, Express Rate Limit, Validator |
| **Styling** | Tailwind CSS with Dark Mode (`class`), custom glassmorphism, responsive grid & typography |

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js**: v18+ installed
* **MongoDB**: Running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI

### 1. Install All Dependencies
From the project root:
```bash
npm run install:all
```
*(Or individually: `cd server && npm install`, then `cd client && npm install`)*

### 2. Seed Sample Database
Populates the database with rich sample data (profile, skills, projects, degrees, experiences, certificates, and default admin):
```bash
npm run seed
```

> **Default Admin Credentials**:
> * **Email**: `admin@portfolio.com`
> * **Password**: `admin123456`

### 3. Start Development Servers
Run both backend (`http://localhost:5000`) and frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

* Open your browser to `http://localhost:5173` to explore the portfolio!
* Go to `http://localhost:5173/admin/login` to access the Admin Control Center.

---

## 📡 Backend API Endpoints

### Authentication
* `POST /api/admin/login` — Admin login (returns JWT token)
* `POST /api/admin/logout` — Logout
* `GET  /api/admin/profile` — Get authenticated admin profile
* `PUT  /api/admin/profile` — Update admin name, email, or password

### Portfolio Content
* `GET  /api/profile` — Fetch portfolio profile (Public)
* `PUT  /api/profile` — Update portfolio profile (Admin)
* `GET  /api/skills` — Fetch skills (Public, supports `?category=`)
* `POST /api/skills`, `PUT /api/skills/:id`, `DELETE /api/skills/:id` — CRUD skills (Admin)
* `GET  /api/projects` — Fetch projects (Public, supports `?category=` & `?search=`)
* `GET  /api/projects/:id` — Single project details (Public)
* `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id` — CRUD projects (Admin)
* `GET  /api/education`, `POST /api/education`, `PUT /api/education/:id`, `DELETE /api/education/:id` — CRUD education (Public/Admin)
* `GET  /api/experience`, `POST /api/experience`, `PUT /api/experience/:id`, `DELETE /api/experience/:id` — CRUD experience (Public/Admin)
* `GET  /api/certificates`, `POST /api/certificates`, `PUT /api/certificates/:id`, `DELETE /api/certificates/:id` — CRUD certificates (Public/Admin)
* `POST /api/contact` — Submit inquiry message (Public, rate-limited)
* `GET  /api/contact`, `PUT /api/contact/:id/read`, `DELETE /api/contact/:id` — Inquiries management (Admin)
* `POST /api/upload` — Multipart image & PDF document upload (Admin)

---

## 📦 Production Deployment

### Build Client
```bash
npm run build
```
This builds the optimized production assets into `client/dist`.

### Run Production Server
In `server/.env`, set `NODE_ENV=production`.
Run:
```bash
cd server && npm start
```
The Express server will automatically serve the static React frontend from `client/dist` and handle all API routes on port 5000.

---

## 👨‍💻 Author
**Kundan Kumar**
* Role: Full Stack MERN Developer
* Email: kundan.dev@example.com
