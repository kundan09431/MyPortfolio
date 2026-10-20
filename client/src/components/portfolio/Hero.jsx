import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, FileText } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';

const Hero = ({ profile, onOpenResume }) => {
  const roles = profile?.roles?.length
    ? profile.roles
    : [
        'Full Stack MERN Developer',
        'React & Node.js Specialist',
        'RESTful API Architect',
        'Frontend UI/UX Enthusiast',
      ];

  // Typing animation effect
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(110);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const social = profile?.socialLinks || {};

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-500/15 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{profile?.availability || 'Available for Immediate Opportunities'}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
                Hello, I am
              </h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {profile?.name || 'Kundan Kumar'}
              </h1>

              {/* Typing Role Header */}
              <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start">
                <span className="text-2xl sm:text-4xl font-bold gradient-text">
                  {currentText}
                </span>
                <span className="inline-block w-1 h-8 sm:h-10 ml-1 bg-indigo-500 animate-pulse" />
              </div>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile?.shortBio ||
                'Passionate Full Stack Developer crafting responsive, performant, and user-centric web applications with the modern MERN stack.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FileText size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>Resume Preview</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-slate-600 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all hover:scale-110"
                  >
                    <Github size={18} />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all hover:scale-110"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {social.leetcode && (
                  <a
                    href={social.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all hover:scale-110"
                  >
                    <SiLeetcode size={18} />
                  </a>
                )}
                {social.email && (
                  <a
                    href={`mailto:${profile?.email || 'kundan.dev@example.com'}`}
                    aria-label="Email"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all hover:scale-110"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Hero Avatar & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 sm:w-84 md:w-96 aspect-square">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-1.5 shadow-2xl shadow-indigo-500/30 animate-float">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative">
                  <img
                    src={
                      profile?.avatarUrl ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={profile?.name || 'Kundan Kumar'}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Tech Pill 1 */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 px-4 py-2 rounded-2xl glass shadow-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100"
              > */}
                {/* <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" /> */}
                {/* <span>React & Node.js</span> */}
              {/* </motion.div> */}

              {/* Floating Tech Pill 2 */}
              {/* <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 px-4 py-2.5 rounded-2xl glass shadow-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-100"
              > */}
                {/* <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" /> */}
                {/* <span>MongoDB & Express</span> */}
              {/* </motion.div> */}

              {/* Floating Experience Badge */}
              {/* <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-2 rounded-xl bg-indigo-600 text-white shadow-xl flex items-center gap-1.5 text-xs font-bold"
              >
                <Sparkles size={14} /> */}
                {/* <span>{profile?.yearsExperience || '2+ Yrs'} Exp</span> */}
              {/* </motion.div> */}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
