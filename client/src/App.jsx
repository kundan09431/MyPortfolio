import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';

// Public Pages
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';

// Admin Components & Pages
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProfile from './pages/admin/ManageProfile';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';
import ManageEducation from './pages/admin/ManageEducation';
import ManageExperience from './pages/admin/ManageExperience';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageMessages from './pages/admin/ManageMessages';

import { profileAPI } from './services/api';

function AppContent() {
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await profileAPI.get();
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (e) {
        // fail gracefully
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <ScrollProgress />
      <BackToTop />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Show Navbar on public views */}
      {!isAdminRoute && <Navbar profile={profile} />}

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home profile={profile} setProfile={setProfile} />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="profile" element={<ManageProfile />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="certificates" element={<ManageCertificates />} />
              <Route path="messages" element={<ManageMessages />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Show Footer on public views */}
      {!isAdminRoute && <Footer profile={profile} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
