import React, { useState, useEffect } from 'react';
import { profileAPI, uploadAPI } from '../../services/api';
import {
  User,
  Upload,
  Save,
  Loader2,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ManageProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    roles: '',
    shortBio: '',
    aboutText: '',
    careerObjective: '',
    yearsExperience: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
    avatarUrl: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      leetcode: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileAPI.get();
        if (res.data.success) {
          const p = res.data.data;
          setFormData({
            name: p.name || '',
            title: p.title || '',
            roles: p.roles ? p.roles.join(', ') : '',
            shortBio: p.shortBio || '',
            aboutText: p.aboutText || '',
            careerObjective: p.careerObjective || '',
            yearsExperience: p.yearsExperience || '',
            email: p.email || '',
            phone: p.phone || '',
            location: p.location || '',
            availability: p.availability || '',
            avatarUrl: p.avatarUrl || '',
            resumeUrl: p.resumeUrl || '',
            socialLinks: {
              github: p.socialLinks?.github || '',
              linkedin: p.socialLinks?.linkedin || '',
              twitter: p.socialLinks?.twitter || '',
              instagram: p.socialLinks?.instagram || '',
              leetcode: p.socialLinks?.leetcode || '',
            },
          });
        }
      } catch (error) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const field = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    setUploadingAvatar(true);
    try {
      const res = await uploadAPI.uploadFile(uploadData);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, avatarUrl: res.data.url }));
        toast.success('Avatar image uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload image.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    setUploadingResume(true);
    try {
      const res = await uploadAPI.uploadFile(uploadData);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, resumeUrl: res.data.url }));
        toast.success('Resume PDF uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload document.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        roles: formData.roles
          .split(',')
          .map((r) => r.trim())
          .filter(Boolean),
      };

      const res = await profileAPI.update(payload);
      if (res.data.success) {
        toast.success('Profile details updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading profile configuration...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Portfolio Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Edit your hero landing information, bios, objective, and uploaded documents.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Profile Changes</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Media Uploads Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar Upload */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Profile Avatar
            </h3>

            <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-slate-100 dark:bg-slate-800 shadow">
              <img
                src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
              >
                {uploadingAvatar ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                <span>Upload New Avatar</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Resume Document (PDF)
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <FileText size={20} />
              </div>
              <div className="truncate flex-1">
                <span className="text-xs font-semibold block text-slate-800 dark:text-slate-200 truncate">
                  {formData.resumeUrl || 'sample-resume.pdf'}
                </span>
                <span className="text-[10px] text-slate-400">PDF Document</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="resume-upload"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 cursor-pointer transition"
              >
                {uploadingResume ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                <span>Upload PDF</span>
              </label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />

              {formData.resumeUrl && (
                <a
                  href={formData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                  title="Preview PDF"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Text Fields Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Personal & Header Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Primary Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase">
                Typing Roles (comma-separated)
              </label>
              <input
                type="text"
                name="roles"
                value={formData.roles}
                onChange={handleChange}
                placeholder="Full Stack Developer, React Specialist, Node.js Engineer"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase">Hero Short Bio</label>
              <textarea
                name="shortBio"
                rows={2}
                value={formData.shortBio}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase">About Me Full Text</label>
              <textarea
                name="aboutText"
                rows={4}
                value={formData.aboutText}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase">Career Objective</label>
              <textarea
                name="careerObjective"
                rows={2}
                value={formData.careerObjective}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Contact Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Social Links Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Social Profiles & Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">GitHub URL</label>
                <input
                  type="text"
                  name="social_github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">LinkedIn URL</label>
                <input
                  type="text"
                  name="social_linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">LeetCode URL</label>
                <input
                  type="text"
                  name="social_leetcode"
                  value={formData.socialLinks.leetcode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Twitter / X URL</label>
                <input
                  type="text"
                  name="social_twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
};

export default ManageProfile;
