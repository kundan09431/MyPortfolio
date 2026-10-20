import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const res = await projectsAPI.getById(id);
        if (res.data.success) {
          setProject(res.data.data);
          setActiveImage(res.data.data.image);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <Loader2 size={36} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Project Not Found
        </h2>
        <p className="text-sm text-slate-500">
          The project you are looking for might have been removed or does not exist.
        </p>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow hover:bg-indigo-700 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Back */}
        <div>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-indigo-600 text-white">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles size={13} />
                <span>Featured Project</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition hover:scale-105 active:scale-95"
              >
                <ExternalLink size={16} />
                <span>Visit Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition hover:scale-105 active:scale-95"
              >
                <Github size={16} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden glass-card border border-slate-200/80 dark:border-slate-800 shadow-2xl"
        >
          <img
            src={activeImage || project.image}
            alt={project.title}
            className="w-full h-80 sm:h-[460px] object-cover object-center"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </motion.div>

        {/* Screenshots Gallery Thumbnail List (if multiple) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Project Screenshots
            </h4>
            <div className="flex flex-wrap gap-3">
              {[project.image, ...project.screenshots].map((shot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(shot)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition ${
                    activeImage === shot
                      ? 'border-indigo-600 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={shot}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description & Tech Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Project Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Key Features & Highlights
                </h3>
                <div className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800"
                    >
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <span className="font-semibold block text-slate-900 dark:text-white">Category:</span>
                  <span>{project.category}</span>
                </div>
                <div>
                  <span className="font-semibold block text-slate-900 dark:text-white">Repository:</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline truncate block"
                  >
                    {project.githubUrl || 'Available on request'}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
