import React, { useState, useEffect } from 'react';
import { certificatesAPI, uploadAPI } from '../../services/api';
import { Award, Plus, Edit2, Trash2, Loader2, Upload, X, Check, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    credentialUrl: '',
    image: '',
    description: '',
  });

  const fetchCertificates = async () => {
    try {
      const res = await certificatesAPI.getAll();
      if (res.data.success) {
        setCertificates(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openAddModal = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      organization: '',
      issueDate: '',
      credentialUrl: '',
      image: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      issueDate: cert.issueDate,
      credentialUrl: cert.credentialUrl || '',
      image: cert.image || '',
      description: cert.description || '',
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
        toast.success('Certificate image uploaded!');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      const res = await certificatesAPI.delete(id);
      if (res.data.success) {
        toast.success('Certificate deleted');
        setCertificates((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete certificate');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCert) {
        const res = await certificatesAPI.update(editingCert._id, formData);
        if (res.data.success) {
          toast.success('Certificate updated');
          setCertificates((prev) =>
            prev.map((c) => (c._id === editingCert._id ? res.data.data : c))
          );
        }
      } else {
        const res = await certificatesAPI.create(formData);
        if (res.data.success) {
          toast.success('Certificate added');
          setCertificates((prev) => [res.data.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading certificates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Manage Certificates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upload verification badges, course certifications, and awards.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition"
        >
          <Plus size={16} />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert._id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div className="h-36 bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={cert.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'}
                alt={cert.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">
                  {cert.organization} • {cert.issueDate}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                  {cert.title}
                </h3>
                {cert.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cert.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-semibold hover:underline"
                  >
                    <span>View Link</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">Verified</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingCert ? 'Edit Certificate' : 'Add Certificate'}
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
                <label className="block text-xs font-bold text-slate-500 uppercase">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Meta Full Stack Professional"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Meta / Coursera"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Date / Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image URL or upload"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                  />
                  <label
                    htmlFor="cert-img"
                    className="px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                  >
                    {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  </label>
                  <input
                    id="cert-img"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Credential URL</label>
                <input
                  type="text"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea
                  rows={2}
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
                  <span>{editingCert ? 'Update Certificate' : 'Save Certificate'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCertificates;
