import React from 'react';

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isView?: boolean;
}

export function Toggle({ label, isView, ...props }: ToggleProps) {
  if (isView) {
    const isChecked = props.defaultChecked || props.checked;
    return (
      <div className="flex items-center pt-8">
        <div className={`w-11 h-6 rounded-full flex items-center p-0.5 shadow-sm ${isChecked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
          <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${isChecked ? 'translate-x-5' : ''}`}></div>
        </div>
        <span className="ml-3 text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center pt-8">
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          {...props}
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600 shadow-sm"></div>
        <span className="ml-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      </label>
    </div>
  );
}
