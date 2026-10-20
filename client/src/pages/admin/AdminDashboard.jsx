import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Code2,
  Mail,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Plus,
  Loader2,
  User,
  GraduationCap,
} from 'lucide-react';
import {
  projectsAPI,
  skillsAPI,
  contactAPI,
  educationAPI,
} from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
    educationCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, skillsRes, messagesRes, eduRes] = await Promise.allSettled([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          contactAPI.getAll(),
          educationAPI.getAll(),
        ]);

        const projects = projectsRes.status === 'fulfilled' ? projectsRes.value.data.data : [];
        const skills = skillsRes.status === 'fulfilled' ? skillsRes.value.data.data : [];
        const messages = messagesRes.status === 'fulfilled' ? messagesRes.value.data.data : [];
        const unread = messagesRes.status === 'fulfilled' ? messagesRes.value.data.unreadCount : 0;
        const education = eduRes.status === 'fulfilled' ? eduRes.value.data.data : [];

        setStats({
          projectsCount: projects.length,
          skillsCount: skills.length,
          messagesCount: messages.length,
          unreadMessagesCount: unread,
          educationCount: education.length,
        });

        setRecentMessages(messages.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading control center stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Overview & Metrics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time status of your portfolio projects, technical skills, and incoming client messages.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/skills"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition"
          >
            <Plus size={14} />
            <span>Add Skill</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Projects Card */}
        <Link
          to="/admin/projects"
          className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <FolderGit2 size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.projectsCount}
          </span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Total Projects Live
          </span>
        </Link>

        {/* Skills Card */}
        <Link
          to="/admin/skills"
          className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <Code2 size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.skillsCount}
          </span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Technical Proficiencies
          </span>
        </Link>

        {/* Total Inquiries Card */}
        <Link
          to="/admin/messages"
          className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Mail size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.messagesCount}
          </span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Contact Submissions
          </span>
        </Link>

        {/* Unread Inquiries Card */}
        <Link
          to="/admin/messages"
          className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <Clock size={22} />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
              Action
            </span>
          </div>
          <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {stats.unreadMessagesCount}
          </span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Unread Inquiries
          </span>
        </Link>

      </div>

      {/* Recent Inquiries List */}
      <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Latest messages received through the portfolio contact form.
            </p>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View All Messages →
          </Link>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No inquiries received yet.
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div
                key={msg._id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {msg.name}
                    </span>
                    {!msg.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {msg.subject}:
                    </span>{' '}
                    {msg.message}
                  </p>
                  <span className="text-[11px] text-slate-400 block">
                    {msg.email} • {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition"
                  >
                    Reply
                  </a>
                  <Link
                    to="/admin/messages"
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
