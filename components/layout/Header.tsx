'use client'
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Global Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anywhere..." 
            className="bg-transparent border-none outline-none text-sm w-64 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
        
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Superuser</p>
          </div>
        </button>
      </div>
    </header>
  );
}
