import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2 } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const social = profile?.socialLinks || {};

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md pt-16 pb-12 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Bio & Name */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/25">
                K
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {profile?.name || 'Kundan Kumar'}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {profile?.shortBio ||
                'Full Stack MERN Developer dedicated to crafting responsive, scalable, and intuitive web solutions.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition"
                >
                  <Github size={18} />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {social.leetcode && (
                <a
                  href={social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition"
                >
                  <SiLeetcode size={18} />
                </a>
              )}
              {social.email && (
                <a
                  href={`mailto:${profile?.email || 'kundan.dev@example.com'}`}
                  aria-label="Send Email"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Skills & Tech
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Education & Background
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Career Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Get In Touch */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-600 dark:text-slate-400">
                {profile?.email || 'kundan.dev@example.com'}
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                {profile?.phone || '+91 98765 43210'}
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                {profile?.location || 'India'}
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {profile?.availability || 'Available for work'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center sm:text-left">
            © {currentYear} <span className="font-semibold text-slate-900 dark:text-white">{profile?.name || 'Kundan Kumar'}</span>. All Rights Reserved.
          </p>

          <p className="flex items-center gap-1 text-slate-500">
            Engineered with <Heart size={14} className="text-rose-500 fill-rose-500" /> using MERN & Tailwind CSS
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
