import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutGrid,
  Users,
  UserCheck,
  Settings,
  Sun,
  Moon,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  Bot,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "../pages/_app";

const Layout = ({ children, title, subtitle, onAddLeadClick }) => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read saved state on mount to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
    const savedCollapse = localStorage.getItem("greitta_nav_collapsed");
    if (savedCollapse !== null) {
      setCollapsed(savedCollapse === "true");
    }
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem("greitta_nav_collapsed", String(nextState));
      return nextState;
    });
  };

  const mainNav = [
    { name: "Overview", icon: LayoutGrid, path: "/", count: null },
    { name: "Leads Pipeline", icon: Users, path: "/leads", count: "12" },
  ];

  const secondaryNav = [
    { name: "Agent Profile", icon: UserCheck, path: "/profile" },
    { name: "CRM Settings", icon: Settings, path: "/settings" },
  ];

  const notifications = [
    { id: 1, title: "New Lead captured", time: "2 mins ago", desc: "@alex_crypto via Telegram" },
    { id: 2, title: "Lead #1042 Claimed", time: "15 mins ago", desc: "Claimed by Sarah" },
    { id: 3, title: "Webhook Status 200 OK", time: "1 hour ago", desc: "Telegram listener active" },
  ];

  // Determine current active collapsed state after client mount
  const isNavCollapsed = mounted && collapsed;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* FULL HEIGHT LEFT SIDEBAR PANEL */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isNavCollapsed ? "w-64 md:w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Sidebar Header with Brand & Expand/Collapse Toggle */}
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between min-h-[61px]">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-mint-sm shrink-0">
                  ⚡
                </div>
                {!isNavCollapsed && (
                  <div className="text-left whitespace-nowrap animate-fade-in">
                    <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white block">
                      Greitta AI
                    </span>
                    <span className="text-[10px] font-extrabold text-mint-600 dark:text-mint-400 block -mt-0.5">
                      Telegram CRM
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop Collapse / Expand Toggle Button */}
              <button
                onClick={toggleCollapse}
                className="hidden md:flex p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-mint-50 dark:hover:bg-slate-800 transition-colors"
                title={isNavCollapsed ? "Expand Navigation Panel" : "Collapse Navigation Panel"}
              >
                {isNavCollapsed ? (
                  <PanelLeftOpen size={18} className="text-mint-600 font-bold" />
                ) : (
                  <PanelLeftClose size={18} className="text-slate-500 hover:text-mint-600" />
                )}
              </button>

              {/* Mobile Drawer Close Button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Action Button */}
            <div className="p-2.5">
              <button
                onClick={onAddLeadClick || (() => router.push("/leads?action=new"))}
                className={`w-full flex items-center justify-center py-2.5 rounded-xl bg-mint-600 hover:bg-mint-500 text-white font-bold text-xs transition-all shadow-mint-sm hover:shadow-mint-md active:scale-[0.98] ${
                  isNavCollapsed ? "px-0" : "px-3 space-x-2"
                }`}
                title="Create New Lead"
              >
                <Plus size={16} />
                {!isNavCollapsed && <span className="whitespace-nowrap">Create Lead</span>}
              </button>
            </div>

            {/* Core Navigation Items */}
            <div className="px-2 py-2 space-y-1">
              {!isNavCollapsed && (
                <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Pipeline Management
                </div>
              )}
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.path;
                return (
                  <Link key={item.name} href={item.path} passHref legacyBehavior>
                    <a
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center ${
                        isNavCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2.5"
                      } rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-mint-50 dark:bg-mint-950/80 text-mint-700 dark:text-mint-300 font-extrabold border-l-4 border-mint-500 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 font-semibold"
                      }`}
                      title={isNavCollapsed ? item.name : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          size={18}
                          className={isActive ? "text-mint-600 dark:text-mint-400" : "text-slate-400"}
                        />
                        {!isNavCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                      </div>
                      {!isNavCollapsed && item.count && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-mint-100 dark:bg-mint-900 text-mint-800 dark:text-mint-200">
                          {item.count}
                        </span>
                      )}
                    </a>
                  </Link>
                );
              })}
            </div>

            {/* System Navigation Items */}
            <div className="px-2 py-2 space-y-1 border-t border-slate-100 dark:border-slate-800/80 mt-2">
              {!isNavCollapsed && (
                <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  System & Settings
                </div>
              )}
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.path;
                return (
                  <Link key={item.name} href={item.path} passHref legacyBehavior>
                    <a
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center ${
                        isNavCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2.5"
                      } rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-mint-50 dark:bg-mint-950/80 text-mint-700 dark:text-mint-300 font-extrabold border-l-4 border-mint-500 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 font-semibold"
                      }`}
                      title={isNavCollapsed ? item.name : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          size={18}
                          className={isActive ? "text-mint-600 dark:text-mint-400" : "text-slate-400"}
                        />
                        {!isNavCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Area inside Left Nav Panel */}
          <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <a
              href="/tma/index.html"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center ${
                isNavCollapsed ? "justify-center p-2.5" : "justify-between p-2.5"
              } rounded-xl bg-mint-50/80 dark:bg-mint-950/40 hover:bg-mint-100 text-xs text-mint-800 dark:text-mint-300 font-bold border border-mint-200/80 dark:border-mint-800 transition-colors`}
              title="Open Telegram Mini App (TMA)"
            >
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-mint-600 shrink-0" />
                {!isNavCollapsed && <span>TMA Mini App</span>}
              </div>
              {!isNavCollapsed && <ExternalLink size={13} className="text-mint-500" />}
            </a>

            <div
              className={`rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center ${
                isNavCollapsed ? "justify-center p-2" : "justify-between p-2.5"
              } bg-white dark:bg-slate-900`}
            >
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint-500 to-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-mint-sm">
                  JD
                </div>
                {!isNavCollapsed && (
                  <div className="text-left whitespace-nowrap">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      John Doe
                    </p>
                    <p className="text-[10px] text-mint-600 dark:text-mint-400 font-extrabold leading-tight">
                      Lead Specialist
                    </p>
                  </div>
                )}
              </div>
              {!isNavCollapsed && (
                <Link href="/profile" passHref legacyBehavior>
                  <a className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                    <ChevronRight size={15} />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA WITH PADDING ADJUSTMENT */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isNavCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu size={19} />
            </button>

            <div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-medium">Greitta CRM</span>
                <span className="text-slate-300">/</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">
                  {title || "Overview"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search leads or handles..."
                className="w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500 transition-all font-semibold"
              />
            </div>

            {/* Notification Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-500 hover:bg-mint-50 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-mint-500 rounded-full animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-3.5 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">Notifications</h3>
                    <span className="text-[10px] text-mint-600 font-bold cursor-pointer hover:underline">
                      Mark read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-56 overflow-y-auto my-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2 hover:bg-mint-50/50 dark:hover:bg-slate-800/50 px-1 rounded-lg transition-colors">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{n.desc}</p>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:bg-mint-50 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-mint-600" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;