import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import {
  Bell,
  Users,
  Database,
  Bot,
  CheckCircle2,
  Save,
  RefreshCw,
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      telegramAlerts: true,
    },
    leadAssignment: {
      autoAssign: true,
      roundRobin: true,
    },
    telegramBot: {
      botToken: "7849102834:AAFx9831_Greitta_Demo_Token",
      webhookUrl: "https://greitta-ai.vercel.app/api/telegram-webhook",
    },
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout
      title="CRM Settings"
      subtitle="Configure Telegram bot parameters, lead routing logic, and security rules"
    >
      <div className="space-y-4">
        {/* Toast */}
        {saved && (
          <div className="fixed top-4 right-4 z-50 bg-mint-900 text-white border border-mint-500 px-4 py-2.5 rounded-xl shadow-mint-md flex items-center space-x-2 text-xs font-bold animate-fade-in">
            <CheckCircle2 size={16} className="text-mint-400" />
            <span>Settings updated successfully!</span>
          </div>
        )}

        {/* Tab switcher header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
          <div className="flex items-center space-x-1.5 text-xs font-extrabold">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "general"
                  ? "bg-mint-600 text-white shadow-mint-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Telegram & DB
            </button>
            <button
              onClick={() => setActiveTab("assignment")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "assignment"
                  ? "bg-mint-600 text-white shadow-mint-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Lead Routing
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "notifications"
                  ? "bg-mint-600 text-white shadow-mint-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Notifications
            </button>
          </div>

          <Button variant="mint" onClick={handleSave} icon={Save}>
            Save
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "general" && (
          <div className="space-y-4 animate-fade-in">
            <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Bot size={20} className="text-mint-600" />
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Telegram Bot Connection
                </h2>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bot Token (@BotFather)
                  </label>
                  <input
                    type="password"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-mono"
                    value={settings.telegramBot.botToken}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        telegramBot: { ...settings.telegramBot, botToken: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Webhook Destination URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 font-mono"
                      value={settings.telegramBot.webhookUrl}
                      readOnly
                    />
                    <Button variant="secondary" size="sm" icon={RefreshCw}>
                      Ping
                    </Button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-mint-50 dark:bg-mint-950/80 border border-mint-200 dark:border-mint-800 flex items-center justify-between text-xs font-bold text-mint-800 dark:text-mint-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-mint-600" />
                    <span>Status: Telegram Webhook Listening</span>
                  </div>
                  <span className="font-mono text-[10px] bg-mint-200/80 dark:bg-mint-900 px-2 py-0.5 rounded-md">200 OK</span>
                </div>
              </div>
            </div>

            <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Database size={20} className="text-mint-600" />
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Neon Serverless Database
                </h2>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">Postgres Status:</span>
                <span className="font-extrabold text-mint-600 dark:text-mint-400">Connected & Ready</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assignment" && (
          <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Users size={20} className="text-mint-600" />
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Lead Distribution Rules
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Auto-Assign Incoming Leads
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Automatically assign new Telegram leads to available sales agents
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.leadAssignment.autoAssign}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      leadAssignment: { ...settings.leadAssignment, autoAssign: e.target.checked },
                    })
                  }
                  className="h-4.5 w-4.5 text-mint-600 rounded cursor-pointer accent-mint-600"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Round Robin Routing
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Distribute leads equally across active team members
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.leadAssignment.roundRobin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      leadAssignment: { ...settings.leadAssignment, roundRobin: e.target.checked },
                    })
                  }
                  className="h-4.5 w-4.5 text-mint-600 rounded cursor-pointer accent-mint-600"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="mint-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Bell size={20} className="text-mint-600" />
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Notification Alerts
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Telegram Channel Alerts
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Send real-time alert to sales group when a new lead is captured
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.telegramAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, telegramAlerts: e.target.checked },
                    })
                  }
                  className="h-4.5 w-4.5 text-mint-600 rounded cursor-pointer accent-mint-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;