import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Layers, Database, Cpu, Wrench } from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiMongoose,
  SiJsonwebtokens,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbApi, TbBrandCSharp } from 'react-icons/tb';

// Dynamic icon mapper
const renderSkillIcon = (iconName, size = 26) => {
  const iconMap = {
    FaHtml5: <FaHtml5 size={size} className="text-orange-500" />,
    FaCss3Alt: <FaCss3Alt size={size} className="text-blue-500" />,
    FaJs: <FaJs size={size} className="text-yellow-400" />,
    FaReact: <FaReact size={size} className="text-cyan-400" />,
    SiTailwindcss: <SiTailwindcss size={size} className="text-cyan-500" />,
    FaBootstrap: <FaBootstrap size={size} className="text-purple-500" />,
    FaNodeJs: <FaNodeJs size={size} className="text-emerald-500" />,
    SiExpress: <SiExpress size={size} className="text-slate-800 dark:text-slate-200" />,
    TbApi: <TbApi size={size} className="text-indigo-400" />,
    SiJsonwebtokens: <SiJsonwebtokens size={size} className="text-pink-500" />,
    SiMongodb: <SiMongodb size={size} className="text-emerald-500" />,
    SiMongoose: <SiMongoose size={size} className="text-red-500" />,
    SiMysql: <SiMysql size={size} className="text-blue-600" />,
    FaJava: <FaJava size={size} className="text-red-500" />,
    SiCsharp: <TbBrandCSharp size={size} className="text-purple-600" />,
    TbBrandCSharp: <TbBrandCSharp size={size} className="text-purple-600" />,
    FaGitAlt: <FaGitAlt size={size} className="text-orange-600" />,
    FaGithub: <FaGithub size={size} className="text-slate-800 dark:text-slate-200" />,
    VscVscode: <VscVscode size={size} className="text-blue-500" />,
    SiPostman: <SiPostman size={size} className="text-orange-500" />,
  };

  return iconMap[iconName] || <Code2 size={size} className="text-indigo-500" />;
};

const Skills = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Frontend', icon: Layers },
    { name: 'Backend', icon: Cpu },
    { name: 'Database', icon: Database },
    { name: 'Programming Languages', icon: Code2 },
    { name: 'Tools', icon: Wrench },
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <Code2 size={14} />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            The programming languages, frameworks, databases, and development tools I use to build production applications.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'glass text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {renderSkillIcon(skill.icon)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {skill.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {skill.proficiency || 85}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency || 85}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
