// // 'use client'
// // import React from 'react';
// // import { Menu, Bell, Search } from 'lucide-react';

// // export function Header({ onMenuClick }: { onMenuClick: () => void }) {
// //   return (
// //     <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 sticky top-0">
// //       <div className="flex items-center gap-4">
// //         <button 
// //           onClick={onMenuClick}
// //           className="p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
// //         >
// //           <Menu size={24} />
// //         </button>
        
// //         {/* Global Search */}
// //         <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
// //           <Search size={18} className="text-slate-400" />
// //           <input 
// //             type="text" 
// //             placeholder="Search anywhere..." 
// //             className="bg-transparent border-none outline-none text-sm w-64 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
// //           />
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-3 sm:gap-5">
// //         <button className="relative p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
// //           <Bell size={20} />
// //           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
// //         </button>
        
// //         <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
        
// //         <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
// //           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
// //             A
// //           </div>
// //           <div className="hidden sm:block text-left">
// //             <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">Admin</p>
// //             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Superuser</p>
// //           </div>
// //         </button>
// //       </div>
// //     </header>
// //   );
// // }


// 'use client'

// import React, { useState } from 'react';
// import { Menu, Bell, Search, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';

// export function Header({ onMenuClick, onThemeToggle, isDark }: { 
//   onMenuClick: () => void; 
//   onThemeToggle: () => void; 
//   isDark: boolean 
// }) {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const notifications = [
//     { id: 1, title: 'New client registered', time: '5 min ago', read: false },
//     { id: 2, title: 'System update completed', time: '1 hour ago', read: false },
//   ];

//   return (
//     <header className="sticky top-0 z-30">
//       <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 h-16 flex items-center justify-between px-4 lg:px-6 shadow-lg">
        
//         {/* Left Section */}
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onMenuClick}
//             className="p-2 text-slate-400 hover:text-indigo-400 lg:hidden rounded-lg hover:bg-slate-800 transition-all"
//           >
//             <Menu size={20} />
//           </button>
          
//           {/* Search Bar */}
//           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
//             <Search size={16} className="text-slate-400" />
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="bg-transparent outline-none text-sm w-64 text-slate-200 placeholder:text-slate-500"
//             />
//             <kbd className="text-xs text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">⌘K</kbd>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-2">
//           {/* Theme Toggle - Working */}
//           <button 
//             onClick={onThemeToggle}
//             className="p-2 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition-all"
//           >
//             {isDark ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           {/* Notifications */}
//           <div className="relative">
//             <button 
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative p-2 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition-all"
//             >
//               <Bell size={18} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900" />
//             </button>
            
//             {showNotifications && (
//               <>
//                 <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
//                 <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-slideDown">
//                   <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
//                     <h3 className="font-semibold text-white text-sm">Notifications</h3>
//                   </div>
//                   <div className="max-h-80 overflow-y-auto">
//                     {notifications.map((notif) => (
//                       <div key={notif.id} className={`p-3 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${!notif.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
//                         <p className="text-sm text-slate-700 dark:text-slate-200">{notif.title}</p>
//                         <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* User Menu */}
//           <div className="relative">
//             <button 
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-800 transition-all"
//             >
//               <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-md">
//                 AD
//               </div>
//               <ChevronDown size={14} className="text-slate-400" />
//             </button>
            
//             {showUserMenu && (
//               <>
//                 <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-slideDown">
//                   <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
//                     <p className="text-sm font-semibold text-white">Admin User</p>
//                     <p className="text-xs text-slate-400">admin@erp.com</p>
//                   </div>
//                   <div className="py-1">
//                     <button className="w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center gap-2 transition-colors">
//                       <User size={14} /> Profile
//                     </button>
//                     <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 transition-colors">
//                       <LogOut size={14} /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }





// // Header Component
// 'use client'

// import React, { useState } from 'react';
// import { Menu, Bell, Search, Sun, Moon, User, LogOut, ChevronDown, X } from 'lucide-react';

// export function Header({ onMenuClick, onThemeToggle, isDark, sidebarOpen }: { 
//   onMenuClick: () => void; 
//   onThemeToggle: () => void; 
//   isDark: boolean;
//   sidebarOpen: boolean;
// }) {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const notifications = [
//     { id: 1, title: 'New client registered', time: '5 min ago', read: false },
//     { id: 2, title: 'System update completed', time: '1 hour ago', read: false },
//   ];

//   return (
//     <header className="sticky top-0 z-30">
//       <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        
//         {/* Left Section */}
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onMenuClick}
//             className="p-2 text-red-600 hover:text-white bg-red-200 rounded-lg hover:bg-red-600 transition-all cursor-pointer"
//           >
//             <Menu size={20} />
//           </button>
          
//           {/* Search Bar */}
//           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-red-300 focus-within:ring-1 focus-within:ring-red-200 transition-all">
//             <Search size={16} className="text-gray-400" />
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="bg-transparent outline-none text-sm w-64 text-gray-700 placeholder:text-gray-400"
//             />
//             <kbd className="text-xs text-gray-400 px-1.5 py-0.5 rounded bg-gray-100">⌘K</kbd>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-2">
//           {/* Theme Toggle */}
//           <button 
//             onClick={onThemeToggle}
//             className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
//           >
//             {isDark ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           {/* Notifications */}
//           <div className="relative">
//             <button 
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
//             >
//               <Bell size={18} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
//             </button>
            
//             {showNotifications && (
//               <>
//                 <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
//                   <div className="p-3 border-b border-gray-100 bg-white flex justify-between items-center">
//                     <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
//                     <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-red-500 transition-all cursor-pointer">
//                       <X size={16} />
//                     </button>
//                   </div>
//                   <div className="max-h-80 overflow-y-auto">
//                     {notifications.map((notif) => (
//                       <div key={notif.id} className={`p-3 border-b border-gray-50 hover:bg-red-50 cursor-pointer transition-colors ${!notif.read ? 'bg-red-50/30' : ''}`}>
//                         <p className="text-sm text-gray-700">{notif.title}</p>
//                         <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* User Menu */}
//           <div className="relative">
//             <button 
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
//             >
//               <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
//                 AD
//               </div>
//               <ChevronDown size={14} className="text-gray-500" />
//             </button>
            
//             {showUserMenu && (
//               <>
//                 <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
//                   <div className="p-3 border-b border-gray-100 bg-white flex justify-between items-center">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-800">Admin User</p>
//                       <p className="text-xs text-gray-500">admin@erp.com</p>
//                     </div>
//                     <button onClick={() => setShowUserMenu(false)} className="text-gray-400 hover:text-red-500 transition-all cursor-pointer">
//                       <X size={16} />
//                     </button>
//                   </div>
//                   <div className="py-1">
//                     <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-all cursor-pointer">
//                       <User size={14} /> Profile
//                     </button>
//                     <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all cursor-pointer">
//                       <LogOut size={14} /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }




'use client'

import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, Sun, Moon, User, LogOut, ChevronDown, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useSession } from './SessionProvider';
import { useRouter } from 'next/navigation';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export function Header({ onMenuClick, onThemeToggle, isDark, sidebarOpen }: { 
  onMenuClick: () => void; 
  onThemeToggle: () => void; 
  isDark: boolean;
  sidebarOpen: boolean;
}) {
  const router = useRouter();
  const { user, signOut } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Client Registered',
      message: 'ABC Company has registered as a new client',
      time: '5 min ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'System Update',
      message: 'System maintenance scheduled for tomorrow',
      time: '1 hour ago',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Payment of $5,000 received from XYZ Corp',
      time: '3 hours ago',
      read: true,
      type: 'success'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getUserInitials = () => {
    if (user?.user_name) {
      return user.user_name.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={14} className="text-yellow-500" />;
      default:
        return <Bell size={14} className="text-blue-500" />;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 flex items-center justify-between px-4 lg:px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 text-red-600 hover:text-white bg-red-100 rounded-lg hover:bg-red-600 transition-all duration-300 cursor-pointer"
          >
            <Menu size={20} />
          </button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-200 transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none text-sm w-64 text-gray-700 placeholder:text-gray-400"
            />
            <kbd className="text-xs text-gray-400 px-1.5 py-0.5 rounded bg-gray-100">⌘K</kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={onThemeToggle}
            className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>
            
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  {/* Header */}
                  <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <p className="text-xs text-gray-500">You have {unreadCount} unread notifications</p>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell size={32} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={`p-3 border-b border-gray-50 hover:bg-red-50 cursor-pointer transition-colors ${!notif.read ? 'bg-red-50/30' : ''}`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">{getNotificationIcon(notif.type)}</div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-1" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-2 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-xs text-gray-600 hover:text-red-600 py-1 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                {getUserInitials()}
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <p className="text-sm font-semibold text-gray-800">{user?.user_name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                    {user?.user_designation && (
                      <p className="text-xs text-gray-400 mt-1">{user.user_designation}</p>
                    )}
                  </div>
                  <div className="py-1">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-all duration-200 cursor-pointer">
                      <User size={14} /> Profile
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all duration-200 cursor-pointer"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}