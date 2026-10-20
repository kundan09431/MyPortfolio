import React from 'react';
import { Award, ExternalLink, Calendar, Building, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Certificates = ({ certificates = [] }) => {
  return (
    <section id="certificates" className="py-24 relative bg-slate-100/40 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <Award size={14} />
            <span>Verifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional certifications and standardized assessments validating my technical capabilities.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between group"
            >
              {/* Image Preview */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={
                    cert.image ||
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-white/20 shadow">
                    <CheckCircle size={16} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Building size={13} />
                      {cert.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Credential Link */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                    >
                      <span>View Credential</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Verified Credential</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
