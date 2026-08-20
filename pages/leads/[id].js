import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Tag,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
  Clock,
  UserCheck,
  Sparkles,
  PlusCircle,
  FileText,
} from "lucide-react";

const LeadDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock initial state for single lead detail
  const [lead, setLead] = useState({
    id: id || "1",
    phone: "+1 234 567 8901",
    ig_handle: "alex_crypto",
    status: "Pending",
    source: "Telegram Bot",
    date: "2026-08-20",
    claimed_by: null,
    notes: "Interested in Greitta AI CRM pro license and bot webhook setup.",
    history: [
      { action: "Lead Captured via Telegram Webhook", date: "2026-08-20 10:14 AM", user: "System" },
      { action: "Auto-Scored Priority: High", date: "2026-08-20 10:15 AM", user: "Greitta AI" },
    ],
  });

  const [newNote, setNewNote] = useState("");

  const handleClaim = () => {
    setLead((prev) => ({
      ...prev,
      status: "Claimed",
      claimed_by: "John Doe (You)",
      history: [
        ...prev.history,
        { action: "Claimed Lead", date: new Date().toLocaleString(), user: "John Doe" },
      ],
    }));
  };

  const handleStatusChange = (newStatus) => {
    setLead((prev) => ({
      ...prev,
      status: newStatus,
      history: [
        ...prev.history,
        { action: `Updated status to ${newStatus}`, date: new Date().toLocaleString(), user: "John Doe" },
      ],
    }));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setLead((prev) => ({
      ...prev,
      history: [
        ...prev.history,
        { action: `Note: ${newNote}`, date: new Date().toLocaleString(), user: "John Doe" },
      ],
    }));
    setNewNote("");
  };

  return (
    <Layout
      title={`Lead #${id || "1"} Details`}
      subtitle="Complete history log, claim assignment, and customer communication notes"
    >
      <div className="space-y-6">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/leads")}
            className="flex items-center space-x-2 text-xs md:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <ArrowLeft size={18} />
            <span>Back to Leads Pipeline</span>
          </button>

          <div className="flex items-center space-x-3">
            {lead.status === "Pending" && (
              <Button variant="emerald" onClick={handleClaim} icon={UserCheck}>
                Claim Lead
              </Button>
            )}
            <select
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Pending">🕒 Status: Pending</option>
              <option value="Claimed">✅ Status: Claimed</option>
              <option value="Contacted">💬 Status: Contacted</option>
              <option value="Qualified">⭐ Status: Qualified</option>
            </select>
          </div>
        </div>

        {/* Lead Profile Main Header Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-glow-brand">
                {(lead.phone || lead.ig_handle).charAt(0)}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {lead.phone}
                </h1>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                  @{lead.ig_handle}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                {lead.status}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {lead.source}
              </span>
            </div>
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Phone size={14} />
                <span>Phone Contact</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{lead.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Calendar size={14} />
                <span>Date Captured</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{lead.date}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <User size={14} />
                <span>Assigned Agent</span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {lead.claimed_by || "Unassigned"}
              </p>
            </div>
          </div>

          {/* Initial Requirements Note */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Initial Requirements Note
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              "{lead.notes}"
            </div>
          </div>
        </div>

        {/* History Timeline & Note Logger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* History Log Stream */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl border space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Activity History & Log
            </h3>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
              {lead.history.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-900"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.action}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      By <span className="font-semibold text-slate-700 dark:text-slate-300">{item.user}</span> • {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Activity Note */}
          <div className="glass-card p-6 rounded-3xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Log Activity Note
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={4}
                placeholder="Type update or call outcome note..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button type="submit" variant="primary" className="w-full" icon={Send}>
                Add Note to Timeline
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetailsPage;