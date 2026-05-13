// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Sidebar } from './Sidebar';
// import { Header } from './Header';

// export function AppLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const isDarkMode = savedTheme === 'dark' ||
//       (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
//     setIsDark(isDarkMode);
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//     if (!isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
//       <div className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//         <Header 
//           onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
//           onThemeToggle={toggleTheme}
//           isDark={isDark}
//           sidebarOpen={sidebarOpen}
//         />
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


'use client'

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Fixed left */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header - Fixed top */}
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onThemeToggle={toggleTheme}
          isDark={isDark}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}