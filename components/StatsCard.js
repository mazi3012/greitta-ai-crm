import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({ title, value, change, changeType = "increase", icon: Icon, subtitle, progressPercent = 75 }) => {
  return (
    <div className="mint-card p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-white to-mint-50/30 dark:from-slate-900 dark:to-slate-900 transition-all hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold tracking-wide uppercase text-slate-400 dark:text-slate-400">
          {title}
        </p>
        {Icon && (
          <div className="p-2 rounded-xl bg-mint-500/10 text-mint-600 dark:text-mint-400 border border-mint-500/20 shadow-xs">
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>

        {change && (
          <div
            className={`flex items-center text-xs font-extrabold space-x-0.5 px-2 py-0.5 rounded-lg ${
              changeType === "increase"
                ? "bg-mint-100 text-mint-800 dark:bg-mint-950 dark:text-mint-300 border border-mint-300/80"
                : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300/80"
            }`}
          >
            {changeType === "increase" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {/* Progress Bar indicator */}
      <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-mint-500 to-emerald-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-semibold flex items-center justify-between">
          <span>{subtitle}</span>
          <span className="font-mono text-[10px] text-mint-600 dark:text-mint-400">{progressPercent}%</span>
        </p>
      )}
    </div>
  );
};

export default StatsCard;