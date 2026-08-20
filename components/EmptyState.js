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
    <div className="mint-card p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center flex flex-col items-center justify-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-mint-50 dark:bg-mint-950/60 border border-mint-200 dark:border-mint-800 flex items-center justify-center text-mint-600 dark:text-mint-400 mb-4 shadow-mint-sm">
        <Icon size={32} />
      </div>
      <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {onAction && (
        <Button variant="mint" onClick={onAction} icon={PlusCircle}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
