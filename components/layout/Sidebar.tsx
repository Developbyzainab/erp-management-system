// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import { 
//   ChevronDown, ChevronRight, Settings, Users, Home, X,
//   LayoutDashboard, Building2, LogOut, Sparkles, 
//   Briefcase, FileText, CreditCard, BarChart3, Store
// } from 'lucide-react';

// export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
//   const pathname = usePathname();
//   const [adminOpen, setAdminOpen] = useState(true);

//   const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
      
//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 z-50 h-screen w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl`}>
        
//         {/* Decorative Background */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
//         </div>
        
//         {/* Logo Area */}
//         <div className="relative h-16 flex items-center px-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800/50">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-md opacity-50" />
//               <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-4 h-4 text-white" />
//               </div>
//             </div>
//             <div>
//               <h1 className="text-lg font-bold tracking-tight">ERP Nexus</h1>
//               <p className="text-[10px] text-slate-400 -mt-0.5">Enterprise Suite</p>
//             </div>
//           </div>
//           <button className="ml-auto lg:hidden p-1.5 hover:bg-slate-800 rounded-lg" onClick={() => setIsOpen(false)}>
//             <X size={18} className="text-slate-400" />
//           </button>
//         </div>
        
//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto py-6 px-3 space-y-4">
          
//           {/* Dashboard Link - No heading */}
//           <div className="space-y-1">
//             <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive={isActive('/')} setIsOpen={setIsOpen} />
//           </div>

//           {/* Administration Dropdown */}
//           <div>
//             <button 
//               onClick={() => setAdminOpen(!adminOpen)} 
//               className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${adminOpen ? 'bg-slate-800/50 text-white' : 'text-slate-300 hover:bg-slate-800/50'}`}
//             >
//               <div className="flex items-center gap-3">
//                 <Settings size={18} />
//                 <span className="text-sm font-medium">Administration</span>
//               </div>
//               {adminOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//             </button>
            
//             {adminOpen && (
//               <div className="ml-6 mt-1 pl-3 border-l border-indigo-500/30 space-y-1">
//                 {/* Clients */}
//                 <NavItem href="/tenants" icon={Users} label="Clients" isActive={isActive('/tenants')} setIsOpen={setIsOpen} />
                
//                 {/* Company */}
//                 <NavItem href="/company" icon={Building2} label="Company" isActive={isActive('/company')} setIsOpen={setIsOpen} />
                
//                 {/* Branches - New */}
//                 <NavItem href="/branches" icon={Store} label="Branches" isActive={isActive('/branches')} setIsOpen={setIsOpen} />
                
//                 {/* Other admin items */}
//                <NavItem href="/departments" icon={Briefcase} label="Departments" isActive={isActive('/departments')} setIsOpen={setIsOpen} />

//                 <NavItem href="#" icon={FileText} label="Documents" setIsOpen={setIsOpen} />
//               </div>
//             )}
//           </div>

//           {/* Finance Section */}
//           <div>
//             <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-all">
//               <div className="flex items-center gap-3">
//                 <CreditCard size={18} />
//                 <span className="text-sm font-medium">Finance</span>
//               </div>
//               <ChevronRight size={14} />
//             </button>
//           </div>

//           {/* Reports */}
//           <NavItem href="#" icon={BarChart3} label="Reports" setIsOpen={setIsOpen} />
//         </div>
        
//         {/* User Footer */}
//         <div className="p-4 border-t border-slate-800/50">
//           <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/30">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm" />
//               <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
//                 AD
//               </div>
//               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-white truncate">Admin User</p>
//               <p className="text-xs text-slate-400 truncate">admin@erp.com</p>
//             </div>
//             <LogOut size={16} className="text-slate-400" />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// // Nav Item Component
// function NavItem({ href, icon: Icon, label, isActive, setIsOpen }: any) {
//   return (
//     <Link 
//       href={href} 
//       onClick={() => setIsOpen(false)}
//       className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'}`}
//     >
//       <Icon size={18} className={isActive ? 'text-indigo-400' : ''} />
//       <span>{label}</span>
//       {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
//     </Link>
//   );
// }




// // Sidebar Component - Without Hover
// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import { 
//   ChevronDown, ChevronRight, Settings, Users, Home, X,
//   LayoutDashboard, Building2, LogOut, Sparkles, 
//   Briefcase, FileText, CreditCard, BarChart3, Store
// } from 'lucide-react';

// export function Sidebar({ isOpen, setIsOpen }: { 
//   isOpen: boolean; 
//   setIsOpen: (val: boolean) => void;
// }) {
//   const pathname = usePathname();
//   const [adminOpen, setAdminOpen] = useState(true);

//   const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

//   // Simple - sirf isOpen se control hoga
//   const width = isOpen ? 'w-64' : 'w-16';

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden cursor-pointer"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
      
//       {/* Sidebar - No hover functionality */}
//       <aside 
//         className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 text-gray-700 transition-all duration-300 ease-out flex flex-col shadow-lg ${width}`}
//       >
        
//         {/* Logo Area */}
//         <div className={`relative h-16 flex items-center border-b border-gray-200 bg-white transition-all duration-300 ${
//           isOpen ? 'px-4' : 'px-2 justify-center'
//         }`}>
//           <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
//             <div className="relative">
//               <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
//                 <Sparkles className="w-4 h-4 text-white" />
//               </div>
//             </div>
//             {isOpen && (
//               <div>
//                 <h1 className="text-base font-bold tracking-tight text-gray-800">ERP Nexus</h1>
//                 <p className="text-[9px] text-gray-400 -mt-0.5">Enterprise Suite</p>
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto py-4 px-2 space-y-3">
          
//           {/* Dashboard Link */}
//           <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive={isActive('/')} isOpen={isOpen} />
          
//           {/* Administration Dropdown */}
//           <div>
//             <button 
//               onClick={() => isOpen && setAdminOpen(!adminOpen)} 
//               className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all cursor-pointer ${
//                 adminOpen && isOpen ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
//               } ${!isOpen && 'justify-center'}`}
//               title={!isOpen ? "Administration" : ""}
//             >
//               <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
//                 <Settings size={18} className="group-hover:text-red-500" />
//                 {isOpen && <span className="text-sm font-medium">Administration</span>}
//               </div>
//               {isOpen && (adminOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
//             </button>
            
//             {isOpen && adminOpen && (
//               <div className="ml-5 mt-1 pl-2 border-l border-red-200 space-y-1">
//                 <NavItem href="/tenants" icon={Users} label="Clients" isActive={isActive('/tenants')} isOpen={isOpen} />
//                 <NavItem href="/company" icon={Building2} label="Company" isActive={isActive('/company')} isOpen={isOpen} />
//                 <NavItem href="/branches" icon={Store} label="Branches" isActive={isActive('/branches')} isOpen={isOpen} />
//                 <NavItem href="/departments" icon={Briefcase} label="Departments" isActive={isActive('/departments')} isOpen={isOpen} />
//                 <NavItem href="#" icon={FileText} label="Documents" isOpen={isOpen} />
//               </div>
//             )}
//           </div>

//           {/* Finance Section */}
//           <div>
//             <button className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer ${
//               !isOpen && 'justify-center'
//             }`} title={!isOpen ? "Finance" : ""}>
//               <CreditCard size={18} className="group-hover:text-red-500" />
//               {isOpen && <span className="text-sm font-medium">Finance</span>}
//             </button>
//           </div>

//           {/* Reports */}
//           <NavItem href="#" icon={BarChart3} label="Reports" isOpen={isOpen} />

//           {/* Extra items */}
//           <NavItem href="#" icon={BarChart3} label="Analytics" isOpen={isOpen} />
//           <NavItem href="#" icon={Users} label="Customers" isOpen={isOpen} />
//           <NavItem href="#" icon={Building2} label="Settings" isOpen={isOpen} />
//           <NavItem href="#" icon={Store} label="Inventory" isOpen={isOpen} />
//           <NavItem href="#" icon={Briefcase} label="Projects" isOpen={isOpen} />
//           <NavItem href="#" icon={FileText} label="Invoices" isOpen={isOpen} />
//         </div>
        
//         {/* User Footer */}
//         <div className={`p-3 border-t border-gray-200 bg-white transition-all duration-300 ${!isOpen && 'px-1'}`}>
//           <div className={`flex items-center gap-2 px-2 py-2 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer group ${
//             !isOpen && 'justify-center'
//           }`} title={!isOpen ? "Admin User" : ""}>
//             <div className="relative">
//               <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
//                 AD
//               </div>
//               <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
//             </div>
//             {isOpen && (
//               <>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-medium text-gray-800 truncate">Admin User</p>
//                   <p className="text-[10px] text-gray-500 truncate">admin@erp.com</p>
//                 </div>
//                 <LogOut size={14} className="text-gray-400 group-hover:text-red-500 transition-all" />
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// // Nav Item Component
// function NavItem({ href, icon: Icon, label, isActive, isOpen }: any) {
//   return (
//     <Link 
//       href={href} 
//       className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all cursor-pointer group ${
//         isActive 
//           ? 'bg-red-50 text-red-600' 
//           : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
//       } ${!isOpen && 'justify-center'}`}
//       title={!isOpen ? label : ""}
//     >
//       <Icon 
//         size={18} 
//         className={`transition-all ${
//           isActive 
//             ? 'text-red-500' 
//             : 'text-gray-500 group-hover:text-red-500'
//         }`} 
//       />
//       {isOpen && <span>{label}</span>}
//       {isActive && isOpen && <div className="ml-auto w-1 h-1 rounded-full bg-red-500" />}
//     </Link>
//   );
// }



'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from './SessionProvider';

import { 
  ChevronDown, ChevronRight, Settings, Users,
  LayoutDashboard, Building2, LogOut, Sparkles, 
  Briefcase, FileText, CreditCard, BarChart3, Store, Bell,
  UserPlus, UserCheck, UserCog  // Added new icons
} from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useSession();
  const [adminOpen, setAdminOpen] = useState(true);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');
  const width = isOpen ? 'w-64' : 'w-16';

  const handleSignOut = async () => {
    setShowLogoutConfirm(false);
    await signOut();
    router.push('/signin');
  };

  const getUserInitials = () => {
    if (user?.user_name) {
      return user.user_name.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Check if current user is admin (you can adjust this logic)
  const isAdmin = user?.user_name === 'Admin' || user?.email === 'admin@erp.com';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar - Fixed */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 text-gray-700 transition-all duration-300 ease-out flex flex-col shadow-lg ${width}`}
      >
        
        {/* Logo Area */}
        <div className={`relative h-16 flex items-center border-b border-gray-200 bg-white transition-all duration-300 ${
          isOpen ? 'px-4' : 'px-2 justify-center'
        }`}>
          <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
            <div className="relative">
              <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            {isOpen && (
              <div>
                <h1 className="text-base font-bold tracking-tight text-gray-800">ERP Nexus</h1>
                <p className="text-[9px] text-gray-400 -mt-0.5">Enterprise Suite</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-3">
          
          {/* Dashboard Link */}
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" isActive={isActive('/dashboard')} isOpen={isOpen} />
          
          {/* User Management Dropdown - New */}
          <div>
            <button 
              onClick={() => isOpen && setUserManagementOpen(!userManagementOpen)} 
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all cursor-pointer ${
                userManagementOpen && isOpen ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              } ${!isOpen && 'justify-center'}`}
              title={!isOpen ? "User Management" : ""}
            >
              <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
                <Users size={18} />
                {isOpen && <span className="text-sm font-medium">User Management</span>}
              </div>
              {isOpen && (userManagementOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </button>
            
            {isOpen && userManagementOpen && (
              <div className="ml-5 mt-1 pl-2 border-l border-red-200 space-y-1">
                <NavItem href="/users" icon={UserCheck} label="All Users" isActive={isActive('/users')} isOpen={isOpen} />
                <NavItem href="/users/create" icon={UserPlus} label="Add New User" isActive={isActive('/users/create')} isOpen={isOpen} />
                {isAdmin && (
                  <NavItem href="/users/roles" icon={UserCog} label="User Roles" isActive={isActive('/users/roles')} isOpen={isOpen} />
                )}
              </div>
            )}
          </div>

          {/* Administration Dropdown */}
          <div>
            <button 
              onClick={() => isOpen && setAdminOpen(!adminOpen)} 
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all cursor-pointer ${
                adminOpen && isOpen ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              } ${!isOpen && 'justify-center'}`}
              title={!isOpen ? "Administration" : ""}
            >
              <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
                <Settings size={18} />
                {isOpen && <span className="text-sm font-medium">Administration</span>}
              </div>
              {isOpen && (adminOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </button>
            
            {isOpen && adminOpen && (
              <div className="ml-5 mt-1 pl-2 border-l border-red-200 space-y-1">
                <NavItem href="/tenants" icon={Building2} label="Clients" isActive={isActive('/tenants')} isOpen={isOpen} />
                <NavItem href="/company" icon={Building2} label="Company" isActive={isActive('/company')} isOpen={isOpen} />
                <NavItem href="/branches" icon={Store} label="Branches" isActive={isActive('/branches')} isOpen={isOpen} />
                <NavItem href="/departments" icon={Briefcase} label="Departments" isActive={isActive('/departments')} isOpen={isOpen} />
                <NavItem href="#" icon={FileText} label="Documents" isOpen={isOpen} />
              </div>
            )}
          </div>

          {/* Notifications */}
          <NavItem href="#" icon={Bell} label="Notifications" isOpen={isOpen} />

          {/* Finance Section */}
          <div>
            <button className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer ${
              !isOpen && 'justify-center'
            }`} title={!isOpen ? "Finance" : ""}>
              <CreditCard size={18} />
              {isOpen && <span className="text-sm font-medium">Finance</span>}
            </button>
          </div>

          {/* Reports */}
          <NavItem href="#" icon={BarChart3} label="Reports" isOpen={isOpen} />
          <NavItem href="#" icon={BarChart3} label="Analytics" isOpen={isOpen} />
          <NavItem href="#" icon={Building2} label="Settings" isOpen={isOpen} />
          <NavItem href="#" icon={Store} label="Inventory" isOpen={isOpen} />
          <NavItem href="#" icon={Briefcase} label="Projects" isOpen={isOpen} />
          <NavItem href="#" icon={FileText} label="Invoices" isOpen={isOpen} />
        </div>
        
        {/* User Footer - Fixed at bottom with Logout on hover */}
        <div className={`p-3 border-t border-gray-200 bg-white transition-all duration-300 ${!isOpen && 'px-1'}`}>
          <div 
            onClick={() => isOpen && setShowLogoutConfirm(true)}
            className={`relative flex items-center gap-2 px-2 py-2 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer group ${
              !isOpen && 'justify-center'
            }`} 
            title={!isOpen ? "Logout" : ""}
          >
            <div className="relative">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-xs shadow-md">
                {getUserInitials()}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            {isOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{user?.user_name || 'User'}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="relative">
                  <LogOut size={14} className="text-gray-400 group-hover:text-red-500 transition-all" />
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Logout
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <LogOut size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Logout</h3>
                  <p className="text-sm text-gray-500">Are you sure you want to logout?</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all text-sm font-medium flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ href, icon: Icon, label, isActive, isOpen }: any) {
  // If href is '#' then it's a placeholder, don't make it a link
  if (href === '#') {
    return (
      <div 
        className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all cursor-pointer group ${
          isActive 
            ? 'bg-red-50 text-red-600' 
            : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
        } ${!isOpen && 'justify-center'}`}
        title={!isOpen ? label : ""}
      >
        <Icon 
          size={18} 
          className={`transition-all ${
            isActive 
              ? 'text-red-500' 
              : 'text-gray-500 group-hover:text-red-500'
          }`} 
        />
        {isOpen && <span>{label}</span>}
        {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />}
      </div>
    );
  }

  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all cursor-pointer group ${
        isActive 
          ? 'bg-red-50 text-red-600' 
          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
      } ${!isOpen && 'justify-center'}`}
      title={!isOpen ? label : ""}
    >
      <Icon 
        size={18} 
        className={`transition-all ${
          isActive 
            ? 'text-red-500' 
            : 'text-gray-500 group-hover:text-red-500'
        }`} 
      />
      {isOpen && <span>{label}</span>}
      {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />}
    </Link>
  );
}