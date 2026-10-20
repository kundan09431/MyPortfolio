import React, { useState, useEffect } from 'react';
import { educationAPI } from '../../services/api';
import { GraduationCap, Plus, Edit2, Trash2, Loader2, X, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    description: '',
    grade: '',
    current: false,
  });

  const fetchEducation = async () => {
    try {
      const res = await educationAPI.getAll();
      if (res.data.success) {
        setEducation(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load education entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      description: '',
      grade: '',
      current: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy || '',
      startYear: item.startYear,
      endYear: item.endYear || '',
      description: item.description || '',
      grade: item.grade || '',
      current: item.current || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      const res = await educationAPI.delete(id);
      if (res.data.success) {
        toast.success('Education entry deleted');
        setEducation((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete education entry.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        const res = await educationAPI.update(editingItem._id, formData);
        if (res.data.success) {
          toast.success('Education record updated');
          setEducation((prev) =>
            prev.map((item) => (item._id === editingItem._id ? res.data.data : item))
          );
        }
      } else {
        const res = await educationAPI.create(formData);
        if (res.data.success) {
          toast.success('Education record created');
          setEducation((prev) => [res.data.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save education record.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading education entries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Keep your university degrees, colleges, and certifications up to date.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition"
        >
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item) => (
          <div
            key={item._id}
            className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-indigo-400 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {item.degree}
                </h3>
                {item.grade && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    {item.grade}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {item.institution}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.startYear} – {item.endYear || 'Present'} • {item.fieldOfStudy}
              </p>
              {item.description && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingItem ? 'Edit Education' : 'Add Education'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Degree / Program *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Institution / University *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Field of Study</label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Start Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    placeholder="2022"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">End Year</label>
                  <input
                    type="text"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    placeholder="2026 or Present"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Grade / CGPA</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g. 8.8 / 10 CGPA"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
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
                  <span>{editingItem ? 'Update Entry' : 'Save Entry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageEducation;
