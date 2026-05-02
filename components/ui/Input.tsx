import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isView?: boolean;
}

export function Input({ label, isView, required, ...props }: InputProps) {
  if (isView) {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
          {label}
        </label>
        <div className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 rounded-lg min-h-[46px] flex items-center font-medium shadow-sm">
          {props.defaultValue || props.value || <span className="text-slate-400 dark:text-slate-600">-</span>}
        </div>
      </div>
    );
  }

  const baseClasses = "w-full px-4 py-2.5 rounded-lg outline-none transition-all shadow-sm";
  const editClasses = "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 dark:hover:border-slate-500";

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        required={required}
        className={`${baseClasses} ${editClasses} ${props.className || ''}`}
        {...props}
      />
    </div>
  );
}
