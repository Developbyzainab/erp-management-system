'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Settings, Users, Home, X } from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const [adminOpen, setAdminOpen] = useState(true);
  const [maintOpen, setMaintOpen] = useState(true);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl`}>
        <div className="h-16 flex items-center px-6 font-bold text-xl tracking-wider border-b border-slate-800 bg-slate-950/50">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">ERP System</span>
          <button className="ml-auto lg:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {/* Dashboard Link */}
          <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Level 1: Administration */}
          <div className="pt-2">
            <button 
              onClick={() => setAdminOpen(!adminOpen)} 
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${adminOpen ? 'bg-slate-800/50 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <Settings size={20} />
                <span className="font-medium">Administration</span>
              </div>
              {adminOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {/* Level 2: Maintenance */}
            {adminOpen && (
              <div className="mt-2 ml-4 pl-4 border-l border-slate-700/50 space-y-2">
                <button 
                  onClick={() => setMaintOpen(!maintOpen)} 
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${maintOpen ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span className="font-medium">Maintenance</span>
                  {maintOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                
                {/* Level 3: Tenants */}
                {maintOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l border-slate-700/30 space-y-1">
                    <Link 
                      href="/tenants" 
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname.startsWith('/tenants') ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      <Users size={16} />
                      <span className="font-medium">Tenants</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@erp.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
