import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";
import {
  Users,
  UserCheck,
  Clock,
  Zap,
  Bot,
  ArrowRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const router = useRouter();

  const [stats] = useState([
    {
      title: "Total Leads",
      value: "148",
      change: "+24.5%",
      changeType: "increase",
      icon: Users,
      subtitle: "Across 4 channels",
      progressPercent: 82,
    },
    {
      title: "Claimed Leads",
      value: "62",
      change: "+18.2%",
      changeType: "increase",
      icon: UserCheck,
      subtitle: "41.8% conversion rate",
      progressPercent: 42,
    },
    {
      title: "Pending Queue",
      value: "86",
      change: "-5.4%",
      changeType: "increase",
      icon: Clock,
      subtitle: "Action required",
      progressPercent: 58,
    },
    {
      title: "Avg Response Time",
      value: "4m 12s",
      change: "-32s faster",
      changeType: "increase",
      icon: Zap,
      subtitle: "Telegram Bot automated",
      progressPercent: 94,
    },
  ]);

  const chartData = [
    { name: "Mon", leads: 18, claimed: 8 },
    { name: "Tue", leads: 24, claimed: 14 },
    { name: "Wed", leads: 32, claimed: 18 },
    { name: "Thu", leads: 28, claimed: 12 },
    { name: "Fri", leads: 42, claimed: 26 },
    { name: "Sat", leads: 35, claimed: 20 },
    { name: "Sun", leads: 29, claimed: 15 },
  ];

  const sourceData = [
    { name: "Telegram Bot", value: 65, color: "#059669" },
    { name: "Instagram DM", value: 35, color: "#10b981" },
    { name: "TMA App", value: 28, color: "#34d399" },
    { name: "Web Form", value: 20, color: "#065f46" },
  ];

  const recentActivities = [
    { id: 1, user: "@crypto_king", action: "Claimed by Sarah", time: "5 mins ago" },
    { id: 2, user: "@fashion_hub", action: "New lead from Telegram Bot", time: "12 mins ago" },
    { id: 3, user: "+1 987 654 3210", action: "Status updated to Qualified", time: "34 mins ago" },
    { id: 4, user: "@tech_guru", action: "Claimed by John Doe", time: "1 hour ago" },
  ];

  return (
    <Layout
      title="Overview"
      subtitle="Sales pipeline metrics & Telegram lead performance"
    >
      <div className="space-y-5">
        {/* Mint Light Banner */}
        <div className="mint-card p-6 rounded-2xl border border-mint-200/80 dark:border-slate-800 bg-gradient-to-r from-mint-50/80 via-white to-emerald-50/40 dark:from-slate-900 dark:to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-mint-100 text-mint-800 dark:bg-mint-950 dark:text-mint-300 text-xs font-bold border border-mint-300/60">
              <Sparkles size={13} className="text-mint-600" />
              <span>Telegram Sync Active</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Mint Green CRM Dashboard
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              You have <span className="font-bold text-mint-700 dark:text-mint-400">86 pending leads</span> ready to be claimed in real-time.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="mint"
              onClick={() => router.push("/leads")}
              icon={Users}
            >
              View Pipeline
            </Button>
            <Button
              variant="mintSoft"
              onClick={() => window.open("/tma/index.html", "_blank")}
              icon={Bot}
            >
              TMA App
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {stats.map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Mint Area Chart */}
          <div className="lg:col-span-2 mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Lead Intake & Conversions
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Weekly performance intake timeline
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs font-bold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint-500"></span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">Incoming</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">Claimed</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMintLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorMintClaimed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f088" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#a7f3d0",
                      borderRadius: "12px",
                      color: "#0f172a",
                      fontSize: "11px",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMintLeads)"
                  />
                  <Area
                    type="monotone"
                    dataKey="claimed"
                    stroke="#047857"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMintClaimed)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mint Pie Chart */}
          <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Acquisition Channels
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Lead distribution by source
              </p>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#a7f3d0",
                      borderRadius: "12px",
                      color: "#0f172a",
                      fontSize: "11px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {sourceData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold text-[11px]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Live Activity Stream
            </h3>
            <button
              onClick={() => router.push("/leads")}
              className="text-xs font-bold text-mint-600 hover:text-mint-700 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentActivities.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <MessageSquare size={14} className="text-mint-500" />
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{act.user}</span>
                  <span className="text-slate-500 font-medium">{act.action}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;