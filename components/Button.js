import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-mint-600 hover:bg-mint-500 text-white border border-mint-600 shadow-mint-sm hover:shadow-mint-md",
    mint:
      "bg-mint-600 hover:bg-mint-500 text-white border border-mint-600 shadow-mint-sm",
    mintSoft:
      "bg-mint-50 hover:bg-mint-100 text-mint-700 dark:bg-mint-950 dark:hover:bg-mint-900 dark:text-mint-300 border border-mint-200/80 dark:border-mint-800",
    secondary:
      "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white border border-transparent shadow-xs",
    ghost:
      "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-mint-50 dark:hover:bg-slate-800 hover:text-mint-700 border border-transparent",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs space-x-1.5",
    md: "px-3.5 py-1.5 text-xs space-x-1.5",
    lg: "px-4.5 py-2 text-sm space-x-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : Icon ? (
        <Icon size={14} />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
