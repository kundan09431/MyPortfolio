import React from 'react';
import { GraduationCap, Calendar, Award, Building, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Education = ({ education = [] }) => {
  return (
    <section id="education" className="py-24 relative bg-slate-100/40 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Education & <span className="gradient-text">Qualifications</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            My formal computer science degrees, foundational coursework, and academic milestones.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 md:before:-ml-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-transparent">
          {education.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 dark:border-indigo-500 shadow-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 z-10">
                  <GraduationCap size={16} />
                </div>

                {/* Card Container */}
                <div className="ml-16 md:ml-0 md:w-[45%]">
                  <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all group">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                        <Calendar size={12} />
                        <span>{item.startYear} – {item.endYear || 'Present'}</span>
                      </span>

                      {item.grade && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                          <Award size={12} />
                          <span>{item.grade}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.degree}
                    </h3>
                    
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 flex items-center gap-1.5">
                      <Building size={14} />
                      <span>{item.institution}</span>
                    </p>

                    {item.fieldOfStudy && (
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                        Major: {item.fieldOfStudy}
                      </p>
                    )}

                    {item.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
