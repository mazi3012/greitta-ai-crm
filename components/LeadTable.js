import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  List,
  LayoutGrid,
  ArrowUpDown,
  UserCheck,
  Eye,
  CheckCircle2,
  Tag,
} from "lucide-react";
import Button from "./Button";
import EmptyState from "./EmptyState";

const LeadTable = React.memo(({
  leads = [],
  searchTerm,
  statusFilter,
  sourceFilter = "All",
  onSearchChange,
  onStatusFilterChange,
  onSourceFilterChange,
  onClaimLead,
  onViewLead,
  isLoading = false,
}) => {
  const [viewMode, setViewMode] = useState("table");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  const sortedLeads = React.useMemo(() => {
    return [...leads].sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [leads, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={12} className="ml-1 opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={12} className="ml-1 text-mint-600 dark:text-mint-400" />
    ) : (
      <ChevronDown size={12} className="ml-1 text-mint-600 dark:text-mint-400" />
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(leads.map((l) => l.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Claimed":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-mint-100 text-mint-800 dark:bg-mint-950 dark:text-mint-300 border border-mint-300 dark:border-mint-800">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500"></span>
            <span>Claimed</span>
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Pending</span>
          </span>
        );
      case "Contacted":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span>Contacted</span>
          </span>
        );
      case "Qualified":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Qualified</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-1">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search handle, phone or notes..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 transition-all shadow-xs"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="relative">
            <select
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer shadow-xs"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Claimed">Claimed</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
          </div>

          {onSourceFilterChange && (
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer shadow-xs"
                value={sourceFilter}
                onChange={(e) => onSourceFilterChange(e.target.value)}
              >
                <option value="All">All Channels</option>
                <option value="Telegram">Telegram Bot</option>
                <option value="Instagram">Instagram DM</option>
                <option value="TMA App">TMA App</option>
                <option value="Web Form">Web Form</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={13} />
            </div>
          )}

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-mint-600 dark:text-mint-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Table View"
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-mint-600 dark:text-mint-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedLeadIds.length > 0 && (
        <div className="bg-mint-50 dark:bg-mint-950/80 border border-mint-200 dark:border-mint-800 px-4 py-2.5 rounded-xl flex items-center justify-between animate-fade-in text-xs font-semibold">
          <div className="flex items-center space-x-2 text-mint-800 dark:text-mint-200">
            <CheckCircle2 size={15} className="text-mint-600" />
            <span>{selectedLeadIds.length} leads selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="mint"
              onClick={() => {
                selectedLeadIds.forEach((id) => onClaimLead(id));
                setSelectedLeadIds([]);
              }}
            >
              Claim Selected
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedLeadIds([])}
            >
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Content Rendering */}
      {isLoading ? (
        <div className="mint-card p-8 rounded-xl text-center text-xs text-slate-400 animate-pulse">
          Loading leads data...
        </div>
      ) : sortedLeads.length === 0 ? (
        <EmptyState
          title="No leads match your search"
          description="Try broadening your search term or filter status."
          onAction={() => {
            onSearchChange("");
            onStatusFilterChange("All");
          }}
          actionLabel="Reset Filters"
        />
      ) : viewMode === "table" ? (
        /* MINT LIGHT TABLE VIEW */
        <div className="mint-card rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200/80 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedLeadIds.length === leads.length && leads.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-mint-600 focus:ring-mint-500 cursor-pointer"
                    />
                  </th>
                  <th
                    className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => requestSort("phone")}
                  >
                    <div className="flex items-center">
                      Lead Contact {getSortIcon("phone")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon("status")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => requestSort("source")}
                  >
                    <div className="flex items-center">
                      Acquisition Channel {getSortIcon("source")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                    onClick={() => requestSort("date")}
                  >
                    <div className="flex items-center">
                      Created Date {getSortIcon("date")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {sortedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-mint-50/40 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(lead.id)}
                        onChange={() => toggleSelectOne(lead.id)}
                        className="rounded border-slate-300 text-mint-600 focus:ring-mint-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-mint-50 dark:bg-mint-950 text-mint-700 dark:text-mint-300 flex items-center justify-center font-extrabold text-xs border border-mint-200 dark:border-mint-800">
                          {(lead.phone || lead.ig_handle || "L").charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {lead.phone}
                          </p>
                          {lead.ig_handle && (
                            <p className="text-[11px] text-mint-600 dark:text-mint-400 font-bold">
                              @{lead.ig_handle.replace("@", "")}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px]">
                        <Tag size={11} className="text-mint-500" />
                        <span>{lead.source}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500 font-mono">
                      {lead.date}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-2">
                      {lead.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="mint"
                          onClick={() => onClaimLead(lead.id)}
                          icon={UserCheck}
                        >
                          Claim
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onViewLead && onViewLead(lead.id)}
                        icon={Eye}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className="mint-card p-4.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {getStatusBadge(lead.status)}
                  <span className="text-[11px] text-slate-400 font-mono">{lead.date}</span>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-mint-50 dark:bg-mint-950 text-mint-700 dark:text-mint-300 flex items-center justify-center font-extrabold text-xs border border-mint-200/80">
                    {(lead.phone || lead.ig_handle || "L").charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                      {lead.phone}
                    </h4>
                    {lead.ig_handle && (
                      <p className="text-[11px] text-mint-600 dark:text-mint-400 font-bold">
                        @{lead.ig_handle.replace("@", "")}
                      </p>
                    )}
                  </div>
                </div>

                {lead.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl mb-3 border border-slate-100 dark:border-slate-800">
                    "{lead.notes}"
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-1">
                <span className="text-[11px] font-semibold text-slate-500">
                  {lead.source}
                </span>

                <div className="flex items-center space-x-2">
                  {lead.status === "Pending" && (
                    <Button
                      size="sm"
                      variant="mint"
                      onClick={() => onClaimLead(lead.id)}
                    >
                      Claim
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onViewLead && onViewLead(lead.id)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadTable;