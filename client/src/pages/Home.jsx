import React, { useState, useEffect } from 'react';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Education from '../components/portfolio/Education';
import Experience from '../components/portfolio/Experience';
import Certificates from '../components/portfolio/Certificates';
import Contact from '../components/portfolio/Contact';
import ResumeModal from '../components/common/ResumeModal';
import {
  profileAPI,
  skillsAPI,
  projectsAPI,
  educationAPI,
  experienceAPI,
  certificatesAPI,
} from '../services/api';
import { Loader2 } from 'lucide-react';

const Home = ({ profile, setProfile }) => {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileRes,
          skillsRes,
          projectsRes,
          eduRes,
          expRes,
          certRes,
        ] = await Promise.allSettled([
          profileAPI.get(),
          skillsAPI.getAll(),
          projectsAPI.getAll(),
          educationAPI.getAll(),
          experienceAPI.getAll(),
          certificatesAPI.getAll(),
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value.data.success) {
          setProfile(profileRes.value.data.data);
        }
        if (skillsRes.status === 'fulfilled' && skillsRes.value.data.success) {
          setSkills(skillsRes.value.data.data);
        }
        if (projectsRes.status === 'fulfilled' && projectsRes.value.data.success) {
          setProjects(projectsRes.value.data.data);
        }
        if (eduRes.status === 'fulfilled' && eduRes.value.data.success) {
          setEducation(eduRes.value.data.data);
        }
        if (expRes.status === 'fulfilled' && expRes.value.data.success) {
          setExperience(expRes.value.data.data);
        }
        if (certRes.status === 'fulfilled' && certRes.value.data.success) {
          setCertificates(certRes.value.data.data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <Loader2 size={40} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium tracking-wide">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <main className="relative">
      <Hero profile={profile} onOpenResume={() => setResumeOpen(true)} />
      <About profile={profile} onOpenResume={() => setResumeOpen(true)} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Education education={education} />
      <Experience experience={experience} />
      <Certificates certificates={certificates} />
      <Contact profile={profile} />

      {/* Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
      />
    </main>
  );
};

export default Home;
