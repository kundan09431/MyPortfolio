import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  Loader2,
  X,
  User,
  Calendar,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await contactAPI.getAll();
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load contact messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await contactAPI.toggleRead(id, !currentStatus);
      if (res.data.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage((prev) => ({ ...prev, isRead: !currentStatus }));
        }
        toast.info(
          !currentStatus ? 'Marked message as read' : 'Marked message as unread'
        );
      }
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await contactAPI.delete(id);
      if (res.data.success) {
        toast.success('Message deleted successfully');
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      toast.error('Failed to delete message.');
    }
  };

  const openMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      // Auto mark read
      await handleToggleRead(msg._id, false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading messages...</p>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Contact Inquiries
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Read and manage submissions from potential employers, clients, and visitors.
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 shadow-lg overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Inbox is clean. No contact inquiries at the moment.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                !msg.isRead
                  ? 'bg-indigo-50/40 dark:bg-indigo-950/20'
                  : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/30'
              }`}
            >
              <div
                className="flex-1 cursor-pointer space-y-1"
                onClick={() => openMessage(msg)}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-sm ${
                      !msg.isRead
                        ? 'font-bold text-slate-900 dark:text-white'
                        : 'font-semibold text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {msg.name}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {msg.email}
                  </span>
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  )}
                </div>

                <h4
                  className={`text-sm line-clamp-1 ${
                    !msg.isRead
                      ? 'font-bold text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {msg.subject}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {msg.message}
                </p>

                <span className="text-[11px] text-slate-400 block pt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition flex items-center gap-1.5"
                >
                  <Send size={12} />
                  <span>Reply</span>
                </a>

                <button
                  onClick={() => handleToggleRead(msg._id, msg.isRead)}
                  className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                >
                  {msg.isRead ? <MailOpen size={16} /> : <Mail size={16} className="text-indigo-600" />}
                </button>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MailOpen size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedMessage.subject}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">From:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedMessage.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Email:</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Message:
                </span>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850 border border-slate-200/40 dark:border-slate-800">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                <Trash2 size={14} />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow"
                >
                  <Send size={14} />
                  <span>Send Reply</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageMessages;
