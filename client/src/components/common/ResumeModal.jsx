import React from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const resumeUrl = profile?.resumeUrl || '/uploads/sample-resume.pdf';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {profile?.name || 'Kundan Kumar'} — Resume
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {profile?.title || 'Full Stack MERN Developer'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content / Summary */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Quick Profile Summary */}
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
                Professional Overview
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {profile?.shortBio ||
                  'Passionate Full Stack Developer crafting responsive, performant, and user-centric web applications with the modern MERN stack.'}
              </p>
            </div>

            {/* Core Competencies Highlight */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Core Competencies & Stack
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>React.js, Tailwind CSS & Modern UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Node.js, Express.js & REST APIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>MongoDB, Mongoose & MySQL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>JWT Auth, Security & Rate Limiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Java, OOP & Problem Solving</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Git, GitHub, Postman, Agile Workflows</span>
                </div>
              </div>
            </div>

            {/* Contact & Availability */}
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-semibold block text-slate-900 dark:text-slate-200">Email:</span>
                <span>{profile?.email || 'kundan.dev@example.com'}</span>
              </div>
              <div>
                <span className="font-semibold block text-slate-900 dark:text-slate-200">Location:</span>
                <span>{profile?.location || 'India'}</span>
              </div>
              <div>
                <span className="font-semibold block text-slate-900 dark:text-slate-200">Experience:</span>
                <span>{profile?.yearsExperience || '2+ Years'}</span>
              </div>
              <div>
                <span className="font-semibold block text-slate-900 dark:text-slate-200">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {profile?.availability || 'Available for Hire'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Close
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition"
            >
              <ExternalLink size={16} />
              <span>Open Document</span>
            </a>
            <a
              href={resumeUrl}
              download={`${profile?.name?.replace(/\s+/g, '_') || 'Resume'}.pdf`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-500/20 transition"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
