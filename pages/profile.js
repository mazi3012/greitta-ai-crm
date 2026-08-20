import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import StatsCard from "../components/StatsCard";
import {
  ShieldCheck,
  Key,
  CheckCircle2,
  Zap,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@greitta.ai",
    role: "Senior Lead Specialist",
    telegram_username: "@johndoe_sales",
    telegram_id: "89410294",
    permissions: [
      "Claim Unassigned Leads",
      "View Dashboard Analytics",
      "Edit Lead Notes & Status",
      "Trigger Telegram Webhooks",
    ],
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout
      title="Agent Profile"
      subtitle="Manage your credentials, Telegram link, and sales statistics"
    >
      <div className="space-y-4">
        {/* Toast */}
        {saved && (
          <div className="fixed top-4 right-4 z-50 bg-mint-900 text-white border border-mint-500 px-4 py-2.5 rounded-xl shadow-mint-md flex items-center space-x-2 text-xs font-bold animate-fade-in">
            <CheckCircle2 size={16} className="text-mint-400" />
            <span>Profile settings saved successfully!</span>
          </div>
        )}

        {/* Profile Banner */}
        <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-mint-500 to-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-mint-sm">
              JD
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-mint-100 text-mint-800 border border-mint-300">
                  Verified Agent
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{user.role}</p>
              <p className="text-xs text-mint-600 dark:text-mint-400 font-bold">
                {user.email}
              </p>
            </div>
          </div>

          <Button variant="mint" onClick={handleSave} icon={ShieldCheck}>
            Save Profile
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatsCard
            title="Total Claimed"
            value="62 Leads"
            change="+18.2%"
            changeType="increase"
            icon={UserCheck}
          />
          <StatsCard
            title="Conversion Rate"
            value="41.8%"
            change="+3.4% target"
            changeType="increase"
            icon={TrendingUp}
          />
          <StatsCard
            title="Avg Response Time"
            value="2m 45s"
            change="Top 5% speed"
            changeType="increase"
            icon={Zap}
          />
        </div>

        {/* Form and Permissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Personal Information
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-semibold"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-semibold"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Telegram Handle
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-semibold"
                    value={user.telegram_username}
                    onChange={(e) => setUser({ ...user, telegram_username: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Telegram User ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-mono"
                    value={user.telegram_id}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Agent Roles & Permissions
            </h3>

            <div className="space-y-2">
              {user.permissions.map((perm, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-mint-50/70 dark:bg-slate-800 border border-mint-200/50 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <Key size={14} className="text-mint-600" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;