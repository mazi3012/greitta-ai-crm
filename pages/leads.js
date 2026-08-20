import React, { useState } from "react";
import Layout from "../components/Layout";
import LeadTable from "../components/LeadTable";
import Button from "../components/Button";
import { Plus, Download, CheckCircle2, X } from "lucide-react";

const LeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [leads, setLeads] = useState([
    { id: 1, phone: "+1 (555) 234-5678", ig_handle: "@crypto_alex", status: "Pending", source: "Telegram", date: "2026-08-20 14:32", notes: "Interested in AI Telegram Bot automation" },
    { id: 2, phone: "+1 (555) 876-5432", ig_handle: "@sarah_designs", status: "Claimed", source: "Instagram", date: "2026-08-20 12:15", notes: "Wants custom pricing tier" },
    { id: 3, phone: "+44 7911 123456", ig_handle: "@tech_uk", status: "Contacted", source: "TMA App", date: "2026-08-19 18:45", notes: "Scheduled demo for Friday" },
    { id: 4, phone: "+1 (555) 432-1098", ig_handle: "@ecommerce_hub", status: "Qualified", source: "Web Form", date: "2026-08-19 10:20", notes: "High budget client ($5k/mo)" },
    { id: 5, phone: "+1 (555) 999-8877", ig_handle: "@john_dev", status: "Pending", source: "Telegram", date: "2026-08-18 21:05", notes: "Requested Telegram Bot integration guide" },
    { id: 6, phone: "+1 (555) 333-2211", ig_handle: "@growth_agency", status: "Claimed", source: "Instagram", date: "2026-08-18 16:50", notes: "Requires multi-agent permissions" },
  ]);

  const [newLead, setNewLead] = useState({
    phone: "",
    ig_handle: "",
    source: "Telegram",
    notes: "",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClaimLead = (id) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "Claimed" } : l))
    );
    showToast("Lead claimed successfully!");
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.phone && !newLead.ig_handle) {
      alert("Please provide at least a phone number or Instagram handle.");
      return;
    }

    const created = {
      id: Date.now(),
      phone: newLead.phone || "N/A",
      ig_handle: newLead.ig_handle ? `@${newLead.ig_handle.replace("@", "")}` : "",
      status: "Pending",
      source: newLead.source,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      notes: newLead.notes,
    };

    setLeads([created, ...leads]);
    setNewLead({ phone: "", ig_handle: "", source: "Telegram", notes: "" });
    setIsModalOpen(false);
    showToast("New lead created and added to pipeline!");
  };

  // Filtering
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ig_handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.notes && l.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    const matchesSource = sourceFilter === "All" || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <Layout
      title="Leads Pipeline"
      subtitle="Manage, claim, and sort incoming customer leads"
      onAddLeadClick={() => setIsModalOpen(true)}
    >
      <div className="space-y-4">
        {/* Mint Toast */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-mint-900 text-white border border-mint-500 px-4 py-2.5 rounded-xl shadow-mint-md flex items-center space-x-2 text-xs font-bold animate-fade-in">
            <CheckCircle2 size={16} className="text-mint-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Leads Pipeline ({filteredLeads.length})
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Real-time incoming leads captured via Telegram & TMA
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="mint"
              onClick={() => setIsModalOpen(true)}
              icon={Plus}
            >
              Add Lead
            </Button>
          </div>
        </div>

        {/* Lead Table Component */}
        <LeadTable
          leads={filteredLeads}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sourceFilter={sourceFilter}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          onSourceFilterChange={setSourceFilter}
          onClaimLead={handleClaimLead}
          onViewLead={(id) => alert(`Viewing lead details #${id}`)}
        />

        {/* Add Lead Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  Create New Lead
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@handle..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500"
                    value={newLead.ig_handle}
                    onChange={(e) => setNewLead({ ...newLead, ig_handle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Acquisition Channel
                  </label>
                  <select
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-semibold"
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                  >
                    <option value="Telegram">Telegram Bot</option>
                    <option value="Instagram">Instagram DM</option>
                    <option value="TMA App">Telegram Mini App (TMA)</option>
                    <option value="Web Form">Web Form</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notes & Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter lead context or notes..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500"
                    value={newLead.notes}
                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="mint">
                    Save Lead
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LeadsPage;