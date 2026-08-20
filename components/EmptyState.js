import React from "react";
import { Inbox, PlusCircle } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No leads found",
  description = "Get started by capturing new leads from Telegram or creating one manually.",
  actionLabel = "Add Lead",
  onAction,
}) => {
  return (
    <div className="glass-card p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center flex flex-col items-center justify-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction} icon={PlusCircle}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;