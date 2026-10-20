import React, { useState, useEffect } from 'react';
import { skillsAPI } from '../../services/api';
import {
  Code2,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 85,
    icon: 'FaReact',
  });

  const categories = [
    'Frontend',
    'Backend',
    'Database',
    'Programming Languages',
    'Tools',
  ];

  const fetchSkills = async () => {
    try {
      const res = await skillsAPI.getAll();
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 85,
      icon: 'FaReact',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Code',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await skillsAPI.delete(id);
      if (res.data.success) {
        toast.success('Skill deleted successfully');
        setSkills((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete skill.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingSkill) {
        const res = await skillsAPI.update(editingSkill._id, formData);
        if (res.data.success) {
          toast.success('Skill updated successfully');
          setSkills((prev) =>
            prev.map((s) => (s._id === editingSkill._id ? res.data.data : s))
          );
        }
      } else {
        const res = await skillsAPI.create(formData);
        if (res.data.success) {
          toast.success('Skill created successfully');
          setSkills((prev) => [...prev, res.data.data]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Skills
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Create, modify, categorize, and delete technical proficiencies.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition"
        >
          <Plus size={16} />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow'
                : 'glass text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill._id}
            className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-indigo-400 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {skill.name}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {skill.proficiency}%
                </span>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 block font-medium">
                {skill.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openEditModal(skill)}
                className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Edit Skill"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                title="Delete Skill"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Skill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Category
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

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                  <span>Proficiency</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{formData.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Icon Name
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g. FaReact, FaNodeJs, SiMongodb"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
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
                  <span>{editingSkill ? 'Update Skill' : 'Create Skill'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageSkills;
