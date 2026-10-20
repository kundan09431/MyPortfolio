import React, { useState, useEffect } from 'react';
import { projectsAPI, uploadAPI } from '../../services/api';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Upload,
  X,
  Check,
  ExternalLink,
  Github,
  Sparkles,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'MERN Stack',
    image: '',
    technologies: '',
    features: '',
    githubUrl: '',
    liveDemoUrl: '',
    featured: false,
  });

  const categories = ['React', 'MERN Stack', 'JavaScript', 'Java', 'Other'];

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'MERN Stack',
      image: '',
      technologies: '',
      features: '',
      githubUrl: '',
      liveDemoUrl: '',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      category: project.category,
      image: project.image,
      technologies: project.technologies?.join(', ') || '',
      features: project.features?.join('\n') || '',
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || '',
      featured: project.featured || false,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    setUploadingImage(true);
    try {
      const res = await uploadAPI.uploadFile(data);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, image: res.data.url }));
        toast.success('Project image uploaded!');
      }
    } catch (error) {
      toast.error('Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await projectsAPI.delete(id);
      if (res.data.success) {
        toast.success('Project deleted successfully');
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete project.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        features: formData.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      if (editingProject) {
        const res = await projectsAPI.update(editingProject._id, payload);
        if (res.data.success) {
          toast.success('Project updated successfully');
          setProjects((prev) =>
            prev.map((p) => (p._id === editingProject._id ? res.data.data : p))
          );
        }
      } else {
        const res = await projectsAPI.create(payload);
        if (res.data.success) {
          toast.success('Project created successfully');
          setProjects((prev) => [res.data.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish portfolio case studies, upload project thumbnails, and update demo URLs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-100 dark:bg-slate-800">
              <img
                src={proj.image || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80'}
                alt={proj.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                {proj.category}
              </span>
              {proj.featured && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {proj.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {proj.technologies?.slice(0, 4).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <Github size={13} />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <ExternalLink size={13} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Edit Project"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload / URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Project Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image URL or upload file below"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                  <label
                    htmlFor="proj-img-upload"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 cursor-pointer hover:bg-indigo-100"
                  >
                    {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    <span>Upload</span>
                  </label>
                  <input
                    id="proj-img-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Short Summary / Card Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Full Description (Detailed Overview) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, Node.js, Express, MongoDB, Tailwind"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Key Features (one feature per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={formData.liveDemoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveDemoUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Feature this project on homepage spotlight
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow transition disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageProjects;
