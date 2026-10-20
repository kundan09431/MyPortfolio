import React from 'react';
import {
  User,
  MapPin,
  Mail,
  GraduationCap,
  Calendar,
  Briefcase,
  CheckCircle,
  Download,
  Target,
  Sparkles,
  Code2,
} from 'lucide-react';
import { motion } from 'framer-motion';

const About = ({ profile, onOpenResume }) => {
  const stats = profile?.stats || {
    projectsCompleted: 18,
    codeCommits: 940,
    yearsExperience: 2,
    satisfiedClients: 12,
  };

  const personalInfo = [
    { label: 'Name', value: profile?.name || 'Kundan Kumar', icon: User },
    { label: 'Location', value: profile?.location || 'India', icon: MapPin },
    { label: 'Email', value: profile?.email || 'kundan.dev@example.com', icon: Mail },
    { label: 'Education', value: 'B.Tech in Computer Science', icon: GraduationCap },
    { label: 'Experience', value: profile?.yearsExperience || '2+ Years', icon: Briefcase },
    {
      label: 'Availability',
      value: profile?.availability || 'Available for Work',
      icon: CheckCircle,
      highlight: true,
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <Sparkles size={14} />
            <span>Know Me Better</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Get to know my journey, career vision, and passion for engineering modern web experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image & Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden glass-card p-3 shadow-xl">
              <img
                src={
                  profile?.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                }
                alt={profile?.name || 'About Kundan'}
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Current Status
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {profile?.availability || 'Open for full-time & freelance projects'}
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/80 dark:border-slate-800/80">
                <span className="block text-2xl font-black gradient-text">
                  {stats.projectsCompleted}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                  Projects
                </span>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/80 dark:border-slate-800/80">
                <span className="block text-2xl font-black gradient-text">
                  {stats.yearsExperience}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                  Years Exp
                </span>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/80 dark:border-slate-800/80">
                <span className="block text-2xl font-black gradient-text">
                  {stats.codeCommits}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                  Commits
                </span>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center border border-slate-200/80 dark:border-slate-800/80">
                <span className="block text-2xl font-black gradient-text">
                  {stats.satisfiedClients}+
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                  Clients
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio, Objective, Info Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Introduction & About Text */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Designing & Developing robust solutions with modern technologies
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {profile?.aboutText ||
                  'I am a dedicated software engineer specializing in modern web technologies. I love solving real-world challenges through clean, maintainable code, sleek user interfaces, and robust server architectures.'}
              </p>
            </div>

            {/* Career Objective Box */}
            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/60 flex items-start gap-3.5">
              <div className="p-2 bg-indigo-600 text-white rounded-xl flex-shrink-0 mt-0.5">
                <Target size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">
                  Career Objective
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {profile?.careerObjective ||
                    'To leverage my expertise in full-stack JavaScript development to architect scalable digital solutions and contribute effectively to innovative technology teams.'}
                </p>
              </div>
            </div>

            {/* Personal Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="truncate">
                      <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {info.label}
                      </span>
                      <span
                        className={`text-sm font-medium truncate block ${
                          info.highlight
                            ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {info.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition hover:scale-105 active:scale-95"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <span>Let's Talk</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
