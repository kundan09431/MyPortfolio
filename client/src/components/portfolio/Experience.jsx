import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = ({ experience = [] }) => {
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Full-Time':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Internship':
        return 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'Freelance':
        return 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800';
      case 'Training':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <Briefcase size={14} />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional roles, engineering internships, and hands-on software development training.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exp.jobRole}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Building2 size={15} />
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeBadgeColor(
                      exp.type
                    )}`}
                  >
                    {exp.type || 'Full-Time'}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <Calendar size={12} />
                    <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2 mt-4">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Pill Badges */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-5 mt-4 border-t border-slate-200 dark:border-slate-800">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
