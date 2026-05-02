import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  isView?: boolean;
  options: { label: string; value: string }[];
}

export function Select({ label, isView, options, required, ...props }: SelectProps) {
  if (isView) {
    const selectedOption = options.find(opt => opt.value === props.defaultValue || opt.value === props.value);
    
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
          {label}
        </label>
        <div className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 rounded-lg min-h-[46px] flex items-center font-medium shadow-sm">
          {selectedOption ? selectedOption.label : <span className="text-slate-400 dark:text-slate-600">-</span>}
        </div>
      </div>
    );
  }

  const baseClasses = "w-full px-4 py-2.5 rounded-lg outline-none transition-all appearance-none shadow-sm";
  const editClasses = "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 dark:hover:border-slate-500";

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        required={required}
        className={`${baseClasses} ${editClasses} ${props.className || ''}`}
        {...props}
      >
        <option value="">--Select {label}--</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Custom Dropdown Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-7 text-slate-500">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
